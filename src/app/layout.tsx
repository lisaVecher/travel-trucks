import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Inter, Manrope } from "next/font/google";

import Header from "@/components/Header";

import Providers from "./providers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Camper rental service for comfortable and memorable journeys",
  keywords: ["camper rental", "campervan", "motorhome", "TravelTrucks"],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${manrope.variable}`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
