import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        beastOrange: "#FF5800",
        vibrantBlue: "#0062FF",
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        geistMono: ['var(--font-geist-mono)'],
      },
      backgroundImage: {
        'beast-gradient': 'linear-gradient(to top, #0062FF22, transparent)',
      }
    },
  },
  plugins: [],
};
export default config;
