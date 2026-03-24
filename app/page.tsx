'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });

// Beat definitions — each beat has its own background text and side text
const BEATS = [
  { id: 0, label: 'hero' },
  { id: 1, label: 'snap' },
  { id: 2, label: 'cream' },
  { id: 3, label: 'beast' },
];

export default function Home() {
  const [beat, setBeat] = useState(0);
  const [prevBeat, setPrevBeat] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  // Advance to next/prev beat with lock to prevent rapid firing
  const goTo = useCallback((next: number) => {
    if (isScrolling.current) return;
    const clamped = Math.max(0, Math.min(BEATS.length - 1, next));
    if (clamped === beat) return;
    isScrolling.current = true;
    setPrevBeat(beat);
    setBeat(clamped);
    setTimeout(() => { isScrolling.current = false; }, 900);
  }, [beat]);

  // Wheel handler
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30) goTo(beat + 1);
      else if (e.deltaY < -30) goTo(beat - 1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [beat, goTo]);

  // Touch handler
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (delta > 40) goTo(beat + 1);
      else if (delta < -40) goTo(beat - 1);
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [beat, goTo]);

  // Keyboard arrow/space
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goTo(beat + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); goTo(beat - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [beat, goTo]);

  const direction = beat > prevBeat ? 1 : -1;

  return (
    <main ref={containerRef} className="fixed inset-0 bg-[#7a2200] overflow-hidden font-inter">
      <LoadingScreen />

      {/* Outer portfolio frame */}
      <div className="fixed inset-0 p-[20px] pointer-events-none z-50">
        <div className="w-full h-full border-[2px] border-white/10 rounded-[40px]" />
      </div>

      {/* Beat dots — right edge */}
      <div className="fixed right-[28px] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {BEATS.map((b) => (
          <button
            key={b.id}
            onClick={() => goTo(b.id)}
            className={`w-1.5 rounded-full transition-all duration-500 ${beat === b.id ? 'h-8 bg-white' : 'h-1.5 bg-white/30'
              }`}
          />
        ))}
      </div>

      {/* ── STICKY VIEWPORT ─────────────────────────────────────────────────── */}
      <div className="absolute inset-[20px] rounded-[40px] overflow-hidden shadow-2xl">

        {/* Background color — morphs per beat */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: beat === 3
              ? 'radial-gradient(ellipse at center, #001a4d 0%, #000510 100%)'
              : 'linear-gradient(135deg, #FF5800 0%, #C43D00 100%)'
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* ── z-10: BACKGROUND WALLPAPER TEXT ──────────────────────────────── */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">

          {/* BEAT 0 — HERO: "FEAST ON" top, "THIS." bottom */}
          <AnimatePresence>
            {beat === 0 && (
              <motion.div
                key="hero-text"
                className="absolute inset-0 flex flex-col items-center justify-between py-[5%]"
                initial={{ opacity: 0, y: direction * 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -direction * 60 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="text-center">
                  <p className="font-geistMono text-[10px] tracking-[0.4em] text-white/40 mb-4 uppercase">
                    Feastables × Mr. Beast
                  </p>
                  <h1 className="text-[16vw] font-black uppercase tracking-tighter leading-[0.85] text-white/90 drop-shadow-2xl">
                    FEAST ON
                  </h1>
                </div>
                <h1 className="text-[16vw] font-black uppercase tracking-tighter leading-[0.85] text-black/75">
                  THIS.
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BEAT 1 — SNAP: text on LEFT */}
          <AnimatePresence>
            {beat === 1 && (
              <motion.div
                key="snap-text"
                className="absolute inset-0 flex flex-col justify-center pl-[5%]"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="max-w-[40vw]">
                  <p className="font-geistMono text-[10px] tracking-[0.35em] text-white/40 mb-3 uppercase">
                    — What's inside
                  </p>
                  <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.85] text-white/90 drop-shadow-2xl">
                    THE<br />CLEAN<br />SNAP.
                  </h2>
                  <div className="mt-6 flex flex-col gap-2.5">
                    {['07 INGREDIENTS', 'ZERO JUNK', 'PUFFED RICE CRUNCH'].map(label => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        <span className="font-geistMono text-sm text-white/60 tracking-widest">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BEAT 2 — CREAM: text on RIGHT */}
          <AnimatePresence>
            {beat === 2 && (
              <motion.div
                key="cream-text"
                className="absolute inset-0 flex flex-col justify-center items-end pr-[5%]"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 80 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="max-w-[40vw] text-right">
                  <p className="font-geistMono text-[10px] tracking-[0.35em] text-white/40 mb-3 uppercase">
                    The secret —
                  </p>
                  <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.85] text-white/90 drop-shadow-2xl">
                    GRASS-<br />FED<br />MILK.
                  </h2>
                  <div className="mt-6 flex flex-col gap-2.5 items-end">
                    {['ULTIMATE CREAMINESS', 'MILK CHOCOLATE BASE'].map(label => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="font-geistMono text-sm text-white/60 tracking-widest">{label}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BEAT 3 — BEAST: headline top, CTA bottom */}
          <AnimatePresence>
            {beat === 3 && (
              <motion.div
                key="beast-text"
                className="absolute inset-0 flex flex-col items-center justify-between py-[6%]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="text-center">
                  <p className="font-geistMono text-[10px] tracking-[0.5em] text-white/30 mb-2 uppercase">Ready?</p>
                  <h1 className="text-[13vw] font-black uppercase tracking-tighter leading-[0.82] text-white/90 drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    GO BEAST
                  </h1>
                </div>
                <div />
                <div className="flex flex-col items-center gap-3 pointer-events-auto z-30">
                  <button className="px-14 py-6 bg-white text-[#FF5800] font-black text-2xl uppercase tracking-widest rounded-[2rem] hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] active:scale-95 transition-all shadow-2xl">
                    Buy Now — $3.99
                  </button>
                  <p className="font-geistMono text-[10px] tracking-[0.3em] text-white/25 uppercase">
                    Free shipping over $25
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>{/* end wallpaper text */}

        {/* ── z-20: 3D CANVAS — bar always on top of text ──────────────────── */}
        <div className="absolute inset-0 z-20 h-full w-full">
          <Experience beat={beat} />
        </div>

        {/* Scroll hint — beat 0 only */}
        <AnimatePresence>
          {beat === 0 && (
            <motion.div
              key="hint"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <p className="font-geistMono text-[9px] tracking-[0.4em] text-white/30 uppercase">Scroll to explore</p>
              {/* Animated chevron */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-4 h-4 border-r-2 border-b-2 border-white/20 rotate-45"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}