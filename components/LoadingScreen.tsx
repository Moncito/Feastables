'use client';

import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const { progress } = useProgress();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Small delay to ensure 100% renders before splitting
    if (progress === 100) {
      setTimeout(() => setLoaded(true), 500);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FF5800]"
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Split Wrapper Effect (Top) */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-[#FF5800]"
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          />
          {/* Split Wrapper Effect (Bottom) */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#FF5800]"
            exit={{ y: '100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          />

          <motion.div 
            className="relative z-10 font-inter font-black text-white text-[10vw] flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
          >
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="block"
              >
                {Math.round(progress)}%
              </motion.span>
            </div>
            <div className="text-xl tracking-[0.3em] mt-4 opacity-50">STAY HUNGRY</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
