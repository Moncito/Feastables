import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Feastables × MrBeast",
  description: "Feast On This. Only 6 Ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${
          bebasNeue.variable
        } ${barlowCondensed.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
