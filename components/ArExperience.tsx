
import React, { useEffect, useRef, useState } from 'react';
import { X, Volume2, VolumeX, Scan } from 'lucide-react';

// Declare intrinsic elements for A-Frame components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-assets': any;
      'a-entity': any;
      'a-camera': any;
      'a-plane': any;
      'a-video': any; // Sometimes needed depending on A-Frame version
    }
  }
}

// Augment React module
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-assets': any;
      'a-entity': any;
      'a-camera': any;
      'a-plane': any;
      'a-video': any;
    }
  }
}

interface ArExperienceProps {
  onClose: () => void;
}

export const ArExperience: React.FC<ArExperienceProps> = ({ onClose }) => {
  const [targetVisible, setTargetVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // URL Video Cyberpunk/Tech loop (Safe CORS)
  const VIDEO_SRC = "https://cdn.pixabay.com/video/2020/04/18/36293-410078235_large.mp4";
  
  // Percorso target
  const TARGET_SRC = "/assets/targets.mind"; 

  useEffect(() => {
    // 1. Lock Body Scroll
    document.body.style.overflow = 'hidden';

    // 2. Setup References
    const sceneEl = document.querySelector('a-scene');
    const targetEl = document.querySelector('#target-entity');
    const videoEl = document.querySelector('#ar-video') as HTMLVideoElement;
    
    // Store video ref for React access
    if (videoEl) {
        videoRef.current = videoEl;
        
        // Check if video can play
        videoEl.addEventListener('loadeddata', () => {
            console.log("AR: Video loaded");
            setIsVideoReady(true);
        });
        
        videoEl.addEventListener('error', () => {
            console.error("AR: Video Error");
        });
    }

    // 3. Event Handlers
    const handleTargetFound = () => {
      console.log("AR: Target Found");
      setTargetVisible(true);
      if (videoEl) {
        // Always try to play. If muted, it should work.
        videoEl.play().catch((e) => {
            // Log simple string error only
            console.warn("AR: Autoplay blocked");
        });
      }
    };

    const handleTargetLost = () => {
      console.log("AR: Target Lost");
      setTargetVisible(false);
      if (videoEl) {
        videoEl.pause();
      }
    };

    // 4. Attach Listeners
    if (targetEl) {
      targetEl.addEventListener('targetFound', handleTargetFound);
      targetEl.addEventListener('targetLost', handleTargetLost);
    }

    // 5. Cleanup
    return () => {
      document.body.style.overflow = '';
      if (targetEl) {
        targetEl.removeEventListener('targetFound', handleTargetFound);
        targetEl.removeEventListener('targetLost', handleTargetLost);
      }
      
      // Stop AR Engine manually to prevent leaks
      const arSystem = (sceneEl as any)?.systems?.['mindar-image-system'];
      if (arSystem) {
        try {
            arSystem.stop();
        } catch(e) {
            // Ignore stop errors
        }
      }
      
      // Remove the MindAR video feed overlay from DOM
      const videoFeed = document.querySelector('.mindar-ui-overlay');
      if (videoFeed) {
          videoFeed.remove();
      }
    };
  }, []);

  const toggleAudio = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
      // Force play update
      if (!video.paused) {
          video.play().catch(() => {});
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* --- UI LAYER --- */}
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full p-4 z-[1001] flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto">
            <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md hover:bg-white/10 transition-colors"
            >
            <X size={20} />
            </button>
            <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-[#00ff41]/30 rounded text-[10px] text-[#00ff41] font-mono animate-pulse">
                REC ●
            </div>
        </div>

        {/* Audio Control - Only shows when target visible */}
        <div className="pointer-events-auto">
             {targetVisible && (
                <button
                onClick={toggleAudio}
                className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border transition-all shadow-lg ${
                    !isMuted
                    ? 'bg-[#00ff41] border-[#00ff41] text-black'
                    : 'bg-black/80 border-white/20 text-white'
                }`}
                >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span className="text-xs font-mono font-bold">
                    {!isMuted ? 'AUDIO ON' : 'UNMUTE'}
                </span>
                </button>
            )}
        </div>
      </div>

      {/* Status Bar (Bottom) */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center z-[1001] pointer-events-none">
        <div className={`
            flex items-center gap-3 px-6 py-3 rounded-lg backdrop-blur-md border transition-all duration-300
            ${targetVisible
                ? 'bg-[#00ff41]/10 border-[#00ff41] text-[#00ff41]'
                : 'bg-black/60 border-white/20 text-white/60'}
        `}>
            {targetVisible ? (
                <>
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff41]"></span>
                    </span>
                    <span className="text-sm font-mono font-bold tracking-widest">SIGNAL LOCKED</span>
                </>
            ) : (
                <>
                    <Scan size={18} className="animate-pulse" />
                    <span className="text-sm font-mono tracking-widest">SCANNING TARGET...</span>
                </>
            )}
        </div>
      </div>

      {/* --- AR LAYER --- */}
      <div className="absolute inset-0 overflow-hidden bg-black z-[1000]">
        <a-scene
            mindar-image={`imageTargetSrc: ${TARGET_SRC}; autoStart: true; uiLoading: no; uiError: no; uiScanning: no; filterMinCF:0.0001; filterBeta: 0.001;`}
            color-space="sRGB"
            embedded
            renderer="colorManagement: true, physicallyCorrectLights"
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false"
            style={{ width: '100%', height: '100%' }}
        >
            <a-assets>
                {/* 
                    VIDEO CONFIGURATION:
                    - id: ar-video
                    - loop: true
                    - crossOrigin: anonymous (Critical for WebGL texture)
                    - playsInline: true (Critical for iOS)
                    - muted: true (Critical for Autoplay)
                */}
                <video
                    id="ar-video"
                    src={VIDEO_SRC}
                    preload="auto"
                    loop
                    crossOrigin="anonymous"
                    playsInline
                    webkit-playsinline="true"
                    muted
                ></video>
            </a-assets>

            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

            <a-entity id="target-entity" mindar-image-target="targetIndex: 0">
                {/* Video Plane */}
                <a-plane
                    src="#ar-video"
                    position="0 0 0"
                    height="0.552" 
                    width="1"
                    rotation="0 0 0"
                    material="shader: flat; transparent: false; alphaTest: 0.5;"
                ></a-plane>
                
                {/* Cosmetic Borders */}
                <a-plane position="0 0.28 0.01" width="1.02" height="0.01" color="#00ff41" material="shader: flat"></a-plane>
                <a-plane position="0 -0.28 0.01" width="1.02" height="0.01" color="#00ff41" material="shader: flat"></a-plane>
            </a-entity>
        </a-scene>
      </div>
    </div>
  );
};