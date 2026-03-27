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
        beastOrange: "#FF5A00",
        beastDark: "#1A0A00",
        heroOrange: "#C8470A",
        vibrantBlue: "#0062FF",
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        geistMono: ['var(--font-geist-mono)'],
        bebas: ['var(--font-bebas-neue)', 'sans-serif'],
        barlow: ['var(--font-barlow-condensed)', 'sans-serif'],
      },
      backgroundImage: {
        'beast-gradient': 'linear-gradient(to top, #0062FF22, transparent)',
      }
    },
  },
  plugins: [],
};
export default config;
