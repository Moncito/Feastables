'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

export default function HUD({ progress }: { progress: MotionValue<number> }) {
  // Beat 2: 0.15 to 0.40 (Glide Right)
  const snapHUDOpacity = useTransform(progress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const snapHUDY1 = useTransform(progress, [0.25, 0.35], [20, 0]);
  const snapHUDY2 = useTransform(progress, [0.25, 0.35], [-20, 0]);

  // Beat 3: 0.45 to 0.70 (Glide Left)
  const milkHUDOpacity = useTransform(progress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const milkHUDY1 = useTransform(progress, [0.55, 0.65], [20, 0]);
  const milkHUDY2 = useTransform(progress, [0.55, 0.65], [-20, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden font-geistMono">

      {/* --- BEAT 2 HUD (RIGHT SIDE) --- */}
      {/* Since bar moves RIGHT, the bar is on the right side of screen, so let's put labels on left/top pointing to the right */}

      {/* Label 1: Top Left pointing Right */}
      <motion.div
        className="absolute top-[25%] left-[20%] flex flex-col items-end"
        style={{ opacity: snapHUDOpacity, y: snapHUDY1 }}
      >
        <div className="text-[10px] md:text-sm text-white tracking-widest whitespace-nowrap mb-1">
          ORGANIC CANE SUGAR
        </div>
        <svg width="200" height="50" className="opacity-80">
          <motion.path
            d="M 200 50 L 150 10 L 0 10"
            fill="transparent"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
        </svg>
      </motion.div>

      {/* Label 2: Bottom Left pointing Right */}
      <motion.div
        className="absolute bottom-[25%] left-[15%] flex flex-col items-end"
        style={{ opacity: snapHUDOpacity, y: snapHUDY2 }}
      >
        <div className="text-[10px] md:text-sm text-white tracking-widest whitespace-nowrap mb-1">
          7 INGREDIENTS ONLY
        </div>
        <svg width="220" height="50" className="opacity-80">
          <motion.path
            d="M 220 0 L 170 40 L 0 40"
            fill="transparent"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* --- BEAT 3 HUD (LEFT SIDE) --- */}
      {/* Since bar moves LEFT, put labels on the right pointing to the left */}

      {/* Label 3: Top Right pointing Left */}
      <motion.div
        className="absolute top-[28%] right-[20%] flex flex-col items-start"
        style={{ opacity: milkHUDOpacity, y: milkHUDY1 }}
      >
        <div className="text-[10px] md:text-sm text-white tracking-widest whitespace-nowrap mb-1">
          GRASS-FED MILK
        </div>
        <svg width="200" height="50" className="opacity-80">
          <motion.path
            d="M 0 50 L 50 10 L 200 10"
            fill="transparent"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Label 4: Bottom Right pointing Left */}
      <motion.div
        className="absolute bottom-[28%] right-[15%] flex flex-col items-start"
        style={{ opacity: milkHUDOpacity, y: milkHUDY2 }}
      >
        <div className="text-[10px] md:text-sm text-white tracking-widest whitespace-nowrap mb-1 text-right">
          ULTIMATE CREAMINESS
        </div>
        <svg width="220" height="50" className="opacity-80">
          <motion.path
            d="M 0 0 L 50 40 L 220 40"
            fill="transparent"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

    </div>
  );
}
