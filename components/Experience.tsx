'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents, ContactShadows } from '@react-three/drei';
import ChocolateBar from './ChocolateBar';
import { Suspense } from 'react';

interface ExperienceProps {
  beat: number;
}

export default function Experience({ beat }: ExperienceProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ powerPreference: 'high-performance', antialias: true }}
        dpr={[1, 2]}
        shadows
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated={false} />
          <AdaptiveEvents />

          {/* Warm ambient — packaging colors never go dark */}
          <ambientLight intensity={3} color="#fff8f0" />

          {/* Strong front key light */}
          <directionalLight position={[1, 3, 7]} intensity={5} color="#ffffff" castShadow />

          {/* Left warm fill */}
          <directionalLight position={[-5, 2, 3]} intensity={2.5} color="#ffd5a0" />

          {/* Right fill */}
          <directionalLight position={[5, 0, 3]} intensity={2} color="#ffffff" />

          {/* Orange underlighting glow */}
          <pointLight position={[0, -2, 4]} intensity={30} color="#FF5800" distance={8} />

          {/* Blue depth accent */}
          <pointLight position={[0, -4, -2]} intensity={15} color="#0055ff" distance={10} />

          <ChocolateBar beat={beat} />

          <ContactShadows
            position={[0, -4, 0]}
            opacity={0.55}
            scale={10}
            blur={3}
            far={8}
            color="#7a2200"
          />

          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
}