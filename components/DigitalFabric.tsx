import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Declare intrinsic elements for Three.js components to fix TypeScript errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      pointsMaterial: any;
    }
  }
}

// Augment React's internal JSX namespace for newer React versions where global JSX might not be sufficient
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      pointsMaterial: any;
    }
  }
}

interface DigitalFabricProps {
  active: boolean;
}

export const DigitalFabric: React.FC<DigitalFabricProps> = ({ active }) => {
  const meshRef = useRef<THREE.Points>(null);
  
  // Create a grid of points
  const particleCount = 10000; // Adjust for performance
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const size = 20;
    const gap = 0.2;
    const rows = Math.sqrt(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const row = Math.floor(i / rows);
      const col = i % rows;
      
      const x = (col * gap) - (rows * gap) / 2;
      const z = (row * gap) - (rows * gap) / 2;
      const y = 0;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate waves
    for (let i = 0; i < particleCount; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      
      // Wave equation based on position and time
      // Multiple sine waves for complex organic movement
      const y = 
        Math.sin(x * 0.5 + time * 0.5) * 1.5 + 
        Math.sin(z * 0.3 + time * 0.3) * 1.5 +
        Math.sin((x + z) * 0.2 + time) * 0.5;

      positions[i * 3 + 1] = y;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Gentle rotation
    meshRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#00ff41"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};