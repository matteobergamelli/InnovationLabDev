import React, { useState, useEffect } from 'react';
import { TerminalLoader } from './components/TerminalLoader';
import { DigitalCanvas } from './components/DigitalCanvas';
import { ContentOverlay } from './components/ContentOverlay';
import { ScanlineOverlay } from './components/ScanlineOverlay';
import { ArExperience } from './components/ArExperience';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [startExperience, setStartExperience] = useState(false);
  const [arMode, setArMode] = useState(false);

  useEffect(() => {
    // Determine when the loading sequence is technically done
    const timer = setTimeout(() => {
      setLoading(false);
      // Slight delay to allow fade out animation
      setTimeout(() => setStartExperience(true), 500);
    }, 4500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#f5f5f5] font-mono selection:bg-[#00ff41] selection:text-black overflow-hidden">
      
      {/* AR Mode Overlay - Takes over everything when active */}
      {arMode ? (
        <ArExperience onClose={() => setArMode(false)} />
      ) : (
        <>
          {/* 3D Background - Always mounted but hidden behind loader initially */}
          <div className="fixed inset-0 z-0">
             <DigitalCanvas active={startExperience} />
          </div>

          {/* CRT Scanline Effect */}
          <ScanlineOverlay />

          {/* Content Layer */}
          {startExperience && (
            <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden">
              <ContentOverlay onEnterAr={() => setArMode(true)} />
            </div>
          )}

          {/* Loader Layer */}
          {loading && <TerminalLoader />}
        </>
      )}
      
    </div>
  );
}