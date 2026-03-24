'use client';

import dynamic from 'next/dynamic';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  // ── Beat timing ──────────────────────────────────────────────────────────────
  // BEAT 1: Hero     0.00 – 0.15
  // BEAT 2: Snap     0.15 – 0.40  (bar glides RIGHT → text on LEFT)
  // BEAT 3: Cream    0.45 – 0.70  (bar glides LEFT  → text on RIGHT)
  // BEAT 4: Beast    0.75 – 1.00  (bar centered     → text top + bottom)

  // BEAT 1
  const heroOpacity = useTransform(smoothProgress, [0, 0.10], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.12], [0, -60]);

  // BEAT 2 — text on LEFT side
  const snapOpacity = useTransform(smoothProgress, [0.17, 0.22, 0.35, 0.40], [0, 1, 1, 0]);
  const snapX = useTransform(smoothProgress, [0.17, 0.28], [-40, 0]);

  // BEAT 3 — text on RIGHT side
  const creamOpacity = useTransform(smoothProgress, [0.47, 0.52, 0.65, 0.70], [0, 1, 1, 0]);
  const creamX = useTransform(smoothProgress, [0.47, 0.58], [40, 0]);

  // BEAT 4
  const ctaOpacity = useTransform(smoothProgress, [0.77, 0.87, 1], [0, 1, 1]);
  const ctaScale = useTransform(smoothProgress, [0.77, 0.87], [0.85, 1]);
  const bgBlueOpacity = useTransform(smoothProgress, [0.87, 1], [0, 0.6]);

  // Scroll progress indicator
  const indicatorScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <main
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#7a2200] overflow-clip"
    >
      <LoadingScreen />

      {/* Outer portfolio frame */}
      <div className="fixed inset-0 p-[20px] pointer-events-none z-50">
        <div className="w-full h-full border-[2px] border-white/10 rounded-[40px]" />
      </div>

      {/* Scroll progress bar — left edge */}
      <div className="fixed left-[28px] top-1/2 -translate-y-1/2 h-[40vh] w-[2px] bg-white/10 rounded-full z-50 overflow-hidden">
        <motion.div
          className="w-full bg-white/60 rounded-full origin-top"
          style={{ scaleY: indicatorScale }}
        />
      </div>

      {/* ── STICKY VIEWPORT ──────────────────────────────────────────────────── */}
      <section className="sticky top-[20px] w-[calc(100vw-40px)] h-[calc(100vh-40px)] mx-auto bg-gradient-to-br from-[#FF5800] to-[#C43D00] rounded-[40px] overflow-hidden shadow-2xl">

        {/* Beat 4 blue atmosphere — behind canvas */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            opacity: bgBlueOpacity,
            background: 'radial-gradient(ellipse at center, #001a4d 0%, #000510 100%)'
          }}
        />

        {/* ── 3D CANVAS — center layer ─────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 h-full w-full">
          <Experience />
        </div>

        {/* ── TEXT LAYER — above canvas so it reads over 3D ────────────────── */}
        <div className="absolute inset-0 z-20 pointer-events-none font-inter text-white">

          {/* ── BEAT 1: HERO — large centered text, fades as bar appears ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            {/* Top label */}
            <p className="font-geistMono text-xs tracking-[0.4em] text-white/50 mb-6 uppercase">
              Feastables × Mr. Beast
            </p>
            {/* Big headline split: sits ABOVE the bar vertically */}
            <h1 className="text-[13vw] font-black uppercase tracking-tighter leading-[0.82] text-center drop-shadow-2xl">
              FEAST ON
            </h1>
            {/* "THIS." sits BELOW — large gap so bar shows through middle */}
            <div className="h-[22vw]" /> {/* spacer — bar lives here */}
            <h1 className="text-[13vw] font-black uppercase tracking-tighter leading-[0.82] text-center drop-shadow-2xl">
              <span className="text-black">THIS.</span>
            </h1>
          </motion.div>

          {/* ── BEAT 2: THE SNAP — text on LEFT, bar on RIGHT ── */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center pl-[6%]"
            style={{ opacity: snapOpacity, x: snapX }}
          >
            {/* Constrained to left 40% so it never touches bar */}
            <div className="max-w-[38vw]">
              <p className="font-geistMono text-[10px] tracking-[0.35em] text-white/50 mb-4 uppercase">
                — What's inside
              </p>
              <h2 className="text-[8vw] font-black uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">
                THE<br />CLEAN<br />SNAP.
              </h2>
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span className="font-geistMono text-sm text-white/80 tracking-widest">07 INGREDIENTS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span className="font-geistMono text-sm text-white/80 tracking-widest">ZERO JUNK</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span className="font-geistMono text-sm text-white/80 tracking-widest">PUFFED RICE CRUNCH</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── BEAT 3: CREAM — text on RIGHT, bar on LEFT ── */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-end pr-[6%]"
            style={{ opacity: creamOpacity, x: creamX }}
          >
            {/* Constrained to right 40% */}
            <div className="max-w-[38vw] text-right">
              <p className="font-geistMono text-[10px] tracking-[0.35em] text-white/50 mb-4 uppercase">
                The secret —
              </p>
              <h2 className="text-[8vw] font-black uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">
                GRASS-<br />FED<br />MILK.
              </h2>
              <div className="mt-6 flex flex-col gap-2 items-end">
                <div className="flex items-center gap-3">
                  <span className="font-geistMono text-sm text-white/80 tracking-widest">ULTIMATE CREAMINESS</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-geistMono text-sm text-white/80 tracking-widest">MILK CHOCOLATE BASE</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── BEAT 4: GO BEAST — headline at TOP, bar centered, button at BOTTOM ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-between py-[6%]"
            style={{ opacity: ctaOpacity, scale: ctaScale }}
          >
            {/* Headline at top */}
            <div className="text-center">
              <p className="font-geistMono text-[10px] tracking-[0.5em] text-white/40 mb-3 uppercase">
                Ready?
              </p>
              <h1 className="text-[11vw] font-black uppercase tracking-tighter leading-[0.82] drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                GO BEAST
              </h1>
            </div>

            {/* Bar lives in the middle (3D canvas handles this) */}
            <div />

            {/* CTA button at bottom */}
            <div className="flex flex-col items-center gap-4">
              <button className="pointer-events-auto px-14 py-6 bg-white text-[#FF5800] font-black text-2xl uppercase tracking-widest rounded-[2rem] hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] active:scale-95 transition-all outline-none shadow-2xl">
                Buy Now — $3.99
              </button>
              <p className="font-geistMono text-[10px] tracking-[0.3em] text-white/30 uppercase">
                Free shipping over $25
              </p>
            </div>
          </motion.div>

        </div>{/* end text layer */}

        {/* Beat label — bottom right corner, always visible */}
        <div className="absolute bottom-8 right-10 z-30 pointer-events-none">
          <motion.p
            className="font-geistMono text-[9px] tracking-[0.4em] text-white/25 uppercase"
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [0, 1]) }}
          >
            Scroll to explore
          </motion.p>
        </div>

      </section>
    </main>
  );
}