'use client';

import { useGLTF } from '@react-three/drei';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ChocolateBar() {
  const { scene } = useGLTF('/assets/mrbeast_crunch_bar.gltf');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  // 1. "Drop" Entry Animation
  // Animate from y: 10 to y: 0 when mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. CHOREOGRAPHY (The Glides)
  // 0% - 15%: Stationary (Hero)
  // 15% - 40%: Glide to RIGHT (x = 3)
  // 45% - 70%: Glide to LEFT (x = -3)
  // 75% - 100%: Center (x = 0)
  const groupX = useTransform(smoothProgress, [0, 0.15, 0.40, 0.45, 0.70, 0.75, 1], [0, 0, 3, 3, -3, -3, 0]);
  
  // Z Zoom at the end
  const groupZ = useTransform(smoothProgress, [0, 0.75, 1], [0, 0, 2]);

  // Orientation
  // Default centered front branding
  const BEAST_FRONT_ROT_Y = 0; // The GLTF might need 0, Math.PI, or Math.PI / 2. Assuming 0 for now.
  
  // Kinetic Rotation:
  // Glide Right -> +45 deg
  // Glide Left -> -45 deg
  const kineticRotationY = useTransform(
    smoothProgress, 
    [0, 0.15, 0.40, 0.45, 0.70, 0.75, 1], 
    [0, 0, Math.PI / 4, Math.PI / 4, -Math.PI / 4, -Math.PI / 4, 0]
  );
  
  // Hero close rapid spin
  const heroSpinY = useTransform(smoothProgress, [0, 0.75, 1], [0, 0, Math.PI * 4]);
  const finalRotY = useTransform(() => BEAST_FRONT_ROT_Y + kineticRotationY.get() + heroSpinY.get());
  
  // Slight tilt forward
  const groupRotX = useTransform(smoothProgress, [0, 1], [0.1, 0.1]);

  // Floating effect
  const [hoverY, setHoverY] = useState(0);
  useFrame((state) => {
    // 3. VERTICAL FLOAT (Math.sin) hovering in zero-gravity
    const t = state.clock.getElapsedTime();
    setHoverY(Math.sin(t * 1.5) * 0.15);
  });

  return (
    <motion.group 
      initial={{ y: 10, scale: 0.1 }}
      animate={mounted ? { y: hoverY, scale: 1.2 } : { y: 10, scale: 0.1 }}
      transition={{ type: "spring", stiffness: 60, damping: 12, mass: 1 }}
      position-x={groupX} 
      position-z={groupZ} 
      rotation-y={finalRotY} 
      rotation-x={groupRotX}
    >
      <primitive object={clonedScene} />
      
      {/* Dynamic tracking rim light inside the group so it stays attached to the bar's physical position */}
      {/* Wait, the user asked for it in Experience? Or tracking X position. 
          If placed inside the group, it follows the X position perfectly, but it rotates with the bar.
          Let's place it here but counter-rotate it so it stays pointing from behind. */}
      {/* We won't put the Spotlight here, we'll put it in Experience to avoid rotating light artifacts. */}
    </motion.group>
  );
}

useGLTF.preload('/assets/mrbeast_crunch_bar.gltf');
