'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents, ContactShadows } from '@react-three/drei';
import ChocolateBar from './ChocolateBar';
import { Suspense } from 'react';
import { motion } from 'framer-motion-3d';
import { useScroll, useTransform, useSpring } from 'framer-motion';

export default function Experience() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  const groupX = useTransform(
    smoothProgress,
    [0, 0.15, 0.40, 0.45, 0.70, 0.75, 1],
    [0, 0, 2.5, 2.5, -2.5, -2.5, 0]
  );

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

          {/* Warm ambient — never let packaging go dark */}
          <ambientLight intensity={3} color="#fff8f0" />

          {/* Strong front key light */}
          <directionalLight
            position={[1, 3, 7]}
            intensity={5}
            color="#ffffff"
            castShadow
          />

          {/* Left fill — warm */}
          <directionalLight
            position={[-5, 2, 3]}
            intensity={2.5}
            color="#ffd5a0"
          />

          {/* Right fill */}
          <directionalLight
            position={[5, 0, 3]}
            intensity={2}
            color="#ffffff"
          />

          {/* ✅ GLOW: Orange underlighting for that floating-product-hero feel */}
          <pointLight position={[0, -2, 4]} intensity={30} color="#FF5800" distance={8} />

          {/* ✅ GLOW: Blue accent from below-back for depth */}
          <pointLight position={[0, -4, -2]} intensity={15} color="#0055ff" distance={10} />

          {/* Tracking rim spot that follows the bar */}
          <motion.spotLight
            castShadow
            position-x={groupX}
            position-y={6}
            position-z={4}
            angle={0.3}
            penumbra={1}
            intensity={200}
            color="#ffffff"
          />

          <ChocolateBar />

          {/* ✅ SHADOW: Soft pool shadow beneath the bar */}
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