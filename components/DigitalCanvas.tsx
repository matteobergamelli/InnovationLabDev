import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { DigitalFabric } from './DigitalFabric';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

interface DigitalCanvasProps {
  active: boolean;
}

export const DigitalCanvas: React.FC<DigitalCanvasProps> = ({ active }) => {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 45 }}
      dpr={[1, 2]} // Optimization for high DPI screens
      gl={{ antialias: false }} // Post-processing handles AA usually, creating a sharper retro look without it
    >
      {/* @ts-ignore */}
      <color attach="background" args={['#050505']} />
      
      <Suspense fallback={null}>
        <DigitalFabric active={active} />
        
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.4}
            levels={8}
          />
          <Noise opacity={0.15} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};