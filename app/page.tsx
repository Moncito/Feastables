'use client';

import dynamic from 'next/dynamic';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

// Dynamic import for Experience to avoid hydration issues
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  // BEAT 1: Hero (0 - 0.15)
  // Text fades out immediately as scroll begins
  const heroOpacity = useTransform(smoothProgress, [0, 0.10], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -100]);

  // BEAT 2: The Snap (0.15 - 0.40)
  const snapOpacity = useTransform(smoothProgress, [0.15, 0.20, 0.35, 0.40], [0, 1, 1, 0]);
  const textXParallaxSnap = useTransform(smoothProgress, [0.15, 0.40], [100, -50]); // Moves slow

  // BEAT 3: Creamy Interior (0.45 - 0.70)
  const creamOpacity = useTransform(smoothProgress, [0.45, 0.50, 0.65, 0.70], [0, 1, 1, 0]);
  const textXParallaxCream = useTransform(smoothProgress, [0.45, 0.70], [-100, 50]);

  // BEAT 4: Beast Mode (0.75 - 1)
  const ctaOpacity = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const ctaScale = useTransform(smoothProgress, [0.75, 0.85], [0.8, 1]);
  const bgBlueOpacity = useTransform(smoothProgress, [0.85, 1], [0, 1]);

  return (
    <main 
      ref={containerRef} 
      className="relative w-full h-[500vh] bg-[#963400] overflow-clip selection:bg-black selection:text-beastOrange"
    >
      <LoadingScreen />

      {/* 1) THE "PORTFOLIO FRAME" - Outer Border (Fixed) */}
      <div className="fixed inset-0 p-[20px] pointer-events-none z-50">
        <div className="w-full h-full border-[2px] border-white/10 rounded-[40px] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      </div>

      {/* 2) THE MAIN CONTENT WINDOW (Sticky) */}
      <section className="sticky top-[20px] w-[calc(100vw-40px)] h-[calc(100vh-40px)] mx-auto bg-gradient-to-br from-[#FF5800] to-[#E64A19] rounded-[40px] overflow-hidden shadow-2xl">
        
        {/* 3D Stage */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <Experience />
        </div>

        {/* Ambient Overlay for Beat 4 */}
        <motion.div 
          className="absolute inset-0 bg-beast-gradient z-0 pointer-events-none"
          style={{ opacity: bgBlueOpacity }}
        />

        {/* Dynamic Typography Overlays */}
        <div className="relative w-full h-full flex items-center justify-center p-12 z-10 pointer-events-none font-inter text-white">
          
          {/* BEAT 1: Hero Entry */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-center drop-shadow-2xl">
              FEAST ON<br/><span className="text-black">THIS.</span>
            </h1>
          </motion.div>

          {/* BEAT 2: The Snap */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-center items-start pl-[8%]"
            style={{ opacity: snapOpacity, x: textXParallaxSnap }}
          >
            <h1 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">
              THE<br />CLEAN<br />SNAP.
            </h1>
            <p className="mt-8 text-2xl font-geistMono max-w-sm text-black/80 font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg">
              07 INGREDIENTS. 00 JUNK.
            </p>
          </motion.div>

          {/* BEAT 3: Creamy Interior */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-center items-end pr-[8%] text-right"
            style={{ opacity: creamOpacity, x: textXParallaxCream }}
          >
            <h1 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">
              GRASS-FED<br />MILK.
            </h1>
            <p className="mt-8 text-2xl font-geistMono max-w-sm text-black/80 font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg ml-auto">
              ULTIMATE CREAMINESS.
            </p>
          </motion.div>

          {/* BEAT 4: Beast Mode Close */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center pt-[15%]"
            style={{ opacity: ctaOpacity, scale: ctaScale }}
          >
            <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              GO BEAST
            </h1>
            <button className="pointer-events-auto px-16 py-8 bg-black text-beastOrange font-black text-3xl uppercase tracking-widest rounded-[2rem] hover:scale-110 hover:shadow-[0_0_80px_rgba(0,0,0,0.8)] active:scale-95 transition-all outline-none">
              Buy Now
            </button>
          </motion.div>

        </div>

      </section>
    </main>
  );
}
