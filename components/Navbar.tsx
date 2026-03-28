"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/bars", label: "Bars", badge: "NEW" },
  { href: "/flavors", label: "Flavors" },
  { href: "/about", label: "About" },
  { href: "/merch", label: "Merch" },
  { href: "/find-a-store", label: "Find a Store" },
];

const TICKER_SEGMENT =
  "ONLY 6 INGREDIENTS \u2756 MILK CHOCOLATE WITH PUFFED RICE \u2756 NEW CRUNCH BAR \u2014 AVAILABLE NOW \u2756 FEAST ON THIS \u2756 MRBEAST BAR CRUNCH \u2756 REAL CHOCOLATE. REAL CRUNCH. \u2756\u00a0\u00a0\u00a0";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { progress } = useProgress();
  const cartCount = 3;

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setLoaded(true), 500);
    }
  }, [progress]);

  return (
    <header className="absolute top-0 left-0 w-full z-50 font-barlow">
      {/* ━━ MAIN NAV BAR ━━ */}
      <motion.div
        initial={{ y: -72, opacity: 0 }}
        animate={loaded ? { y: 0, opacity: 1 } : { y: -72, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#1A0A00] border-b-[3px] border-[#FF5A00]"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[68px]">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            {/* F-mark block */}
            <motion.div
              whileHover={{ rotate: -4, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-11 h-11 flex items-center justify-center bg-[#FF5A00] text-[#1A0A00] rounded-sm select-none font-bebas text-2xl font-black leading-none"
            >
              F
            </motion.div>
            {/* Wordmark */}
            <div className="flex flex-col leading-none gap-[2px]">
              <span className="font-bebas text-white text-[24px] tracking-[0.1em] leading-none">
                FEASTABLES
              </span>
              <span
                className="font-barlow text-[#FF5A00] text-[10px] tracking-[0.28em] uppercase font-semibold leading-none"
              >
                × MR. BEAST
              </span>
            </div>
          </Link>

          {/* ── NAV LINKS ── */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center gap-1.5 py-1"
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() => setHovered(null)}
              >
                <span
                  className={`text-[13px] tracking-[0.18em] uppercase font-semibold transition-colors duration-150 ${
                    hovered === link.href ? "text-white" : "text-white/65"
                  }`}
                >
                  {link.label}
                </span>
                {link.badge && (
                  <span className="bg-[#FF5A00] text-[#1A0A00] text-[7px] font-black tracking-[0.1em] px-[5px] py-[2px] rounded-[2px] uppercase leading-none">
                    {link.badge}
                  </span>
                )}
                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5A00] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hovered === link.href ? 1 : 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />
              </Link>
            ))}
          </nav>

          {/* ── UTILITIES ── */}
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Search */}
            <button
              aria-label="Search"
              className="hidden sm:flex text-white/50 hover:text-white transition-colors duration-150"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Cart */}
            <button
              aria-label={`Cart — ${cartCount} items`}
              className="relative text-white/50 hover:text-white transition-colors duration-150"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-[7px] -right-[7px] bg-[#FF5A00] text-[#1A0A00] text-[9px] font-black w-[16px] h-[16px] rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA — desktop */}
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.04, backgroundColor: "#FF7A30" }}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:flex items-center font-bebas bg-[#FF5A00] text-[#1A0A00] px-7 py-[10px] text-[20px] tracking-[0.1em] leading-none select-none cursor-pointer"
              style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
            >
              FEAST NOW
            </motion.a>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden text-white ml-1"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={mobileOpen ? "open" : "closed"}
              >
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                  </>
                )}
              </motion.svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ━━ ANNOUNCEMENT TICKER ━━ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="bg-[#FF5A00] overflow-hidden h-[30px] flex items-center"
      >
        <div className="ticker-track flex whitespace-nowrap select-none">
          {[TICKER_SEGMENT, TICKER_SEGMENT, TICKER_SEGMENT].map((seg, i) => (
            <span
              key={i}
              className="font-barlow text-[#1A0A00] text-[11px] tracking-[0.22em] uppercase font-semibold pr-0"
            >
              {seg}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ━━ MOBILE MENU ━━ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="lg:hidden bg-[#1A0A00] overflow-hidden border-t border-[#FF5A00]/20"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-3 border-b border-white/5 text-white/75 hover:text-white text-[15px] tracking-[0.18em] uppercase font-semibold transition-colors"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="bg-[#FF5A00] text-[#1A0A00] text-[7px] font-black tracking-[0.1em] px-[5px] py-[2px] rounded-[2px] uppercase leading-none">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <a
                  href="/shop"
                  className="font-bebas block bg-[#FF5A00] text-[#1A0A00] text-center py-4 text-[26px] tracking-[0.12em] leading-none"
                >
                  FEAST NOW
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

