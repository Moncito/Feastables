# Feastables × MrBeast — 3D Product Showcase

An immersive, cinematic 3D product experience for the MrBeast Crunch Bar, built with Next.js, React Three Fiber, and Framer Motion. Navigate through four animated "beats" that each tell a different story about the chocolate bar.

---

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | Next.js 14 (App Router)             |
| Language     | TypeScript                          |
| 3D Rendering | Three.js + React Three Fiber + Drei |
| Animation    | Framer Motion + Framer Motion 3D    |
| Styling      | Tailwind CSS                        |
| Icons        | Lucide React                        |

---

## Features

### 3D Chocolate Bar

- GLTF model rendered in a full-viewport WebGL canvas via React Three Fiber
- Cinematic lerp-based position, rotation, and scale transitions between beats
- Continuous sine-wave floating ("bob") animation on a nested group
- Entry scale-in animation on first mount (scale lerps from `0` to target)
- Custom multi-light rig: warm ambient, strong front key, left/right fills, orange underlighting point light, and a blue depth accent point light
- Contact shadows beneath the model with `@react-three/drei`
- Warehouse HDR environment preset for realistic reflections
- Adaptive DPR and Adaptive Events for WebGL performance optimization

### Beat-Based Navigation (4 Beats)

The experience is divided into four sequential "beats", each with unique layout, copy, and 3D bar positioning:

| Beat | Name      | Description                                                                                                                 |
| ---- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| 0    | **Hero**  | Full-screen "FEAST ON THIS." wallpaper text, bar centered                                                                   |
| 1    | **Snap**  | Left-side ingredient list (07 INGREDIENTS, ZERO JUNK, PUFFED RICE CRUNCH), bar slides right                                 |
| 2    | **Cream** | Right-side GRASS-FED MILK copy, bar slides left                                                                             |
| 3    | **Beast** | Cinematic dark reveal — pulsing glow, "GO BEAST" wallpaper, floating ingredient tags with animated SVG connectors, CTA card |

### Navigation Controls

- **Mouse wheel** — scroll down/up to advance or go back a beat
- **Touch/swipe** — swipe up/down on mobile
- **Keyboard** — `Arrow Down` / `Space` to advance, `Arrow Up` to go back
- **Beat dot indicators** — clickable vertical pill nav on the right edge; active beat shows as a tall pill, inactive as a small dot

### Scroll Lock

A 900ms debounce lock prevents rapid beat skipping from fast scrolls or multiple key presses.

### Loading Screen

- Tracks WebGL asset load progress via `useProgress` from Drei
- Displays live percentage counter with a "STAY HUNGRY" tagline
- Cinematic split-panel exit animation (top half slides up, bottom half slides down) once assets reach 100%

### Background Morphing

The background gradient morphs smoothly between beats:

- Beats 0–2: warm orange linear gradient (`#FF5800` → `#C43D00`)
- Beat 3: deep navy radial gradient (`#001a4d` → `#000510`)

### Beat 3 — Cinematic Details

- Pulsing orange radial glow behind the bar (looping opacity animation)
- "GO" and "BEAST" wallpaper text slide in from opposite sides
- Four floating ingredient tag cards (MILK CHOC, PUFFED RICE, GRASS-FED, 07 INGR.) stagger in with animated thin connector lines
- Bottom-anchored frosted CTA card slides up with a spring animation, showing the $3.99 price and a "FEAST NOW" button with inner pulse ring

### HUD Overlay

Animated SVG connector lines pointing toward the 3D bar, visible during beats 1 and 2:

- Beat 1 (bar on right): labels on the left — **ORGANIC CANE SUGAR** and **7 INGREDIENTS ONLY**
- Beat 2 (bar on left): labels on the right — **GRASS-FED MILK** and **ULTIMATE CREAMINESS**
- Labels and lines fade/slide in using `framer-motion` `MotionValue` transforms tied to scroll progress

### Outer Portfolio Frame

A fixed `2px` white/10 border with `40px` border radius overlays the entire viewport for a polished editorial aesthetic.

### Navbar (Built, Currently Commented Out)

A fully built navbar ready to be enabled:

- Feastables logo with animated "F" mark block
- Desktop nav links: Shop, Bars _(NEW badge)_, Flavors, About, Merch, Find a Store
- Hover-activated animated underline on each nav link
- Search and Cart icon buttons (cart shows item count badge)
- "FEAST NOW" CTA button with angled clip-path
- Mobile hamburger menu with staggered link animation
- Announcement ticker marquee: _"ONLY 6 INGREDIENTS  MILK CHOCOLATE WITH PUFFED RICE  NEW CRUNCH BAR — AVAILABLE NOW"_
- Slide-in entrance animation tied to asset load completion

### Typography

Three custom font variables loaded via `next/font`:

- `Bebas Neue` — display headings and logo
- `Barlow Condensed` — nav links and UI labels
- `Geist Mono` — monospaced metadata and ingredient tags

### Tailwind Theme Extensions

Custom design tokens in `tailwind.config.ts`:

- Colors: `beastOrange` (`#FF5A00`), `beastDark` (`#1A0A00`), `heroOrange`, `vibrantBlue`
- Font families: `bebas`, `barlow`, `geistMono`
- Background: `beast-gradient` utility

---

## Project Structure

```
├── app/
│   ├── layout.tsx        # Root layout — fonts, metadata, Navbar
│   ├── page.tsx          # Main page — beat state, scroll/touch/keyboard handlers, 3D canvas
│   └── globals.css       # Tailwind base, glass utility, ticker marquee keyframes
├── components/
│   ├── ChocolateBar.tsx  # GLTF model, per-beat lerp animation, float bob
│   ├── Experience.tsx    # R3F Canvas, lighting rig, shadows, environment
│   ├── HUD.tsx           # SVG connector label overlays for beats 1 & 2
│   ├── LoadingScreen.tsx # Progress-based split-panel loading animation
│   └── Navbar.tsx        # Full navbar implementation (currently commented out)
└── public/
    └── assets/           # Static assets including mrbeast_crunch_bar.gltf
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```
