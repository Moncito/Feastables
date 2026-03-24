'use client';

import { useGLTF } from '@react-three/drei';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ChocolateBar() {
  const { scene } = useGLTF('/assets/mrbeast_crunch_bar.gltf');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  const BASE_Y_OFFSET = Math.PI;

  // ── Position: bar glides left/right, text owns the opposite side ──
  const groupX = useTransform(
    smoothProgress,
    [0, 0.15, 0.40, 0.45, 0.70, 0.75, 1],
    [0, 0, 2.5, 2.5, -2.5, -2.5, 0]
  );

  // ✅ Bar moves DOWN slightly on beat 4 so "GO BEAST" headline has room above
  const groupY = useTransform(
    smoothProgress,
    [0, 0.75, 1],
    [0, 0, -0.5]
  );

  // ✅ Zoom in gently on beat 4
  const groupZ = useTransform(smoothProgress, [0, 0.75, 1], [0, 0, 1.5]);

  const rotX = useTransform(
    smoothProgress,
    [0, 0.15, 0.40, 0.45, 0.70, 0.75, 1],
    [0.05, 0.05, 0.05, -0.05, -0.05, 0, 0.3]
  );

  const rotY = useTransform(
    smoothProgress,
    [0, 0.15, 0.40, 0.45, 0.70, 0.75, 1],
    [
      BASE_Y_OFFSET,
      BASE_Y_OFFSET,
      BASE_Y_OFFSET + 0.35,
      BASE_Y_OFFSET + 0.35,
      BASE_Y_OFFSET - 0.35,
      BASE_Y_OFFSET - 0.35,
      BASE_Y_OFFSET + Math.PI * 2,
    ]
  );

  const rotZ = useTransform(
    smoothProgress,
    [0, 0.15, 0.40, 0.45, 0.70, 0.75, 1],
    [0, 0, 0.06, 0.06, -0.06, -0.06, 0]
  );

  const outerRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);
  const entryScale = useRef({ value: 0 });

  useFrame((state, delta) => {
    if (!outerRef.current || !floatRef.current) return;

    // ✅ Target scale reduced from 1.2 → 0.85 so full bar is visible in frame
    entryScale.current.value += (0.85 - entryScale.current.value) * Math.min(delta * 3.5, 1);
    outerRef.current.scale.setScalar(entryScale.current.value);

    outerRef.current.position.x = groupX.get();
    outerRef.current.position.y = groupY.get();
    outerRef.current.position.z = groupZ.get();
    outerRef.current.rotation.x = rotX.get();
    outerRef.current.rotation.y = rotY.get();
    outerRef.current.rotation.z = rotZ.get();

    // Float bob
    const t = state.clock.getElapsedTime();
    floatRef.current.position.y = Math.sin(t * 1.4) * 0.12;
  });

  return (
    <group ref={outerRef}>
      <group ref={floatRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload('/assets/mrbeast_crunch_bar.gltf');