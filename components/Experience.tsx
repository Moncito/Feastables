'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents, Float, ContactShadows } from '@react-three/drei';
import ChocolateBar from './ChocolateBar';
import { Suspense } from 'react';
import { motion } from 'framer-motion-3d';
import { useScroll, useTransform, useSpring } from 'framer-motion';

export default function Experience() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });
  
  // Track the X position exactly like the ChocolateBar does so the light follows it
  const groupX = useTransform(smoothProgress, [0, 0.15, 0.40, 0.45, 0.70, 0.75, 1], [0, 0, 3, 3, -3, -3, 0]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ powerPreference: 'high-performance', antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated={false} />
          <AdaptiveEvents />
          
          <ambientLight intensity={0.5} />
          
          {/* Tracking Rim Light */}
          <motion.spotLight
            castShadow
            position-x={groupX}
            position-y={5}
            position-z={-10}
            angle={0.25}
            penumbra={1}
            intensity={250}
            color="#FF5800"
          />

          {/* Tertiary Fill - Beast Blue */}
          <pointLight position={[0, -5, 5]} intensity={10} color="#0062FF" />
          
          {/* Main Key Light */}
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />

          <ChocolateBar />

          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.6} 
            scale={12} 
            blur={2.5} 
            far={10} 
            color="#CC4600"
          />
          
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
