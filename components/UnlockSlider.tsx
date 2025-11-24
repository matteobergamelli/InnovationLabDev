import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { ChevronRight, Lock, ScanLine } from 'lucide-react';

interface UnlockSliderProps {
  onUnlock: () => void;
}

export const UnlockSlider: React.FC<UnlockSliderProps> = ({ onUnlock }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const constraintsRef = React.useRef<HTMLDivElement>(null);
  
  // Max drag distance (approx width of container - width of handle)
  const maxDrag = 220; 

  const backgroundOpacity = useTransform(x, [0, maxDrag], [0.1, 0.4]);
  const glowIntensity = useTransform(x, [0, maxDrag], [0, 1]);
  const textOpacity = useTransform(x, [0, maxDrag * 0.7], [1, 0]);

  const handleDragEnd = async () => {
    if (x.get() > maxDrag * 0.85) {
      setIsUnlocked(true);
      controls.start({ x: maxDrag });
      // Trigger callback after small animation delay
      setTimeout(onUnlock, 500);
    } else {
      controls.start({ x: 0 });
    }
  };

  return (
    <div className="relative w-full max-w-xs mx-auto py-8">
        <div className="absolute -top-6 left-0 right-0 text-center">
            <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[10px] text-[#00ff41] font-mono tracking-widest uppercase"
            >
                Secure Connection Available
            </motion.div>
        </div>

      <div 
        ref={constraintsRef}
        className="relative h-14 bg-black border border-[#333] rounded-full overflow-hidden backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        {/* Dynamic Background fill */}
        <motion.div 
          style={{ opacity: backgroundOpacity }}
          className="absolute inset-0 bg-[#00ff41]"
        />
        
        {/* Scanning grid effect in background */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,65,0.2)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />

        {/* Text Instructions */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="font-mono text-xs font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2">
            Slide to Decode <ScanLine size={12} />
          </span>
        </motion.div>

        {/* Draggable Handle */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          className="absolute top-1 left-1 bottom-1 w-12 bg-[#0d0d0d] rounded-full border border-[#00ff41] flex items-center justify-center cursor-grab active:cursor-grabbing z-20 shadow-[0_0_10px_rgba(0,255,65,0.3)]"
        >
          {isUnlocked ? (
            <Lock className="text-[#00ff41] w-4 h-4" />
          ) : (
            <ChevronRight className="text-white w-5 h-5 animate-pulse" />
          )}
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};