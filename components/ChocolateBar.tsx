'use client';

import { useGLTF } from '@react-three/drei';
import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ChocolateBarProps {
  beat: number;
}

// Target states per beat
// BASE_Y_OFFSET flips model to face camera. Change to 0 if you see the back.
const BASE_Y = Math.PI;

const BEAT_TARGETS = [
  // Beat 0 — Hero: perfectly centered, upright, face-forward
  { x: 0, y: 0, z: 0, scale: 0.8, rotX: 0, rotY: BASE_Y + .5, rotZ: 0 },
  // Beat 1 — Snap: text is LEFT → bar glides RIGHT (+x)
  { x: 2.8, y: 0, z: 0, scale: 0.85, rotX: 0.04, rotY: BASE_Y + 0.2, rotZ: 0.03 },
  // Beat 2 — Cream: text is RIGHT → bar glides LEFT (-x)
  { x: -2.8, y: 0, z: 0, scale: 0.85, rotX: 0.04, rotY: BASE_Y - + 5, rotZ: -0.03 },
  // Beat 3 — Beast: big in-your-face hero shot, tilt top toward camera
  { x: 0, y: .2, z: 3.5, scale: .5, rotX: 0.5, rotY: BASE_Y + 0.4, rotZ: 1 },
  // Beat 4 — Verdict: centered proud display, continuous spin takes over rotY
  { x: 0, y: .2, z: 3, scale: 0.5, rotX: 1, rotY: BASE_Y + 0, rotZ: 1 },
];

export default function ChocolateBar({ beat }: ChocolateBarProps) {
  const { scene } = useGLTF('/assets/mrbeast_crunch_bar.gltf');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const outerRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);

  // Current interpolated state (starts at beat 0 target)
  const state = useRef({
    x: 0, y: 0, z: 0, scale: 0,           // scale starts at 0 for entry
    rotX: 0, rotY: BASE_Y, rotZ: 0,
  });

  // Entry: scale lerps from 0 → target on mount
  const entryDone = useRef(false);

  useFrame((three, delta) => {
    if (!outerRef.current || !floatRef.current) return;

    const target = BEAT_TARGETS[beat];
    const s = state.current;

    // Lerp speed — 0.08 = smooth cinematic, higher = snappier
    const lerpSpeed = Math.min(delta * 5, 1);

    s.x += (target.x - s.x) * lerpSpeed;
    s.y += (target.y - s.y) * lerpSpeed;
    s.z += (target.z - s.z) * lerpSpeed;
    s.rotX += (target.rotX - s.rotX) * lerpSpeed;
    // Beat 4 — continuous slow proud spin instead of lerping to a fixed angle
    if (beat === 4) {
      s.rotY += delta * 0.6;
    } else {
      s.rotY += (target.rotY - s.rotY) * lerpSpeed;
    }
    s.rotZ += (target.rotZ - s.rotZ) * lerpSpeed;

    // Scale lerp toward target
    s.scale += (target.scale - s.scale) * lerpSpeed;

    // Apply to outer group
    outerRef.current.position.set(s.x, s.y, s.z);
    outerRef.current.rotation.set(s.rotX, s.rotY, s.rotZ);
    outerRef.current.scale.setScalar(s.scale);

    // Float bob on inner group
    const t = three.clock.getElapsedTime();
    floatRef.current.position.y = Math.sin(t * 1.4) * 0.1;
  });

  // Trigger entry scale after mount
  useEffect(() => {
    const timer = setTimeout(() => { entryDone.current = true; }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <group ref={outerRef}>
      <group ref={floatRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload('/assets/mrbeast_crunch_bar.gltf');