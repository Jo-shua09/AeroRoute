import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AeroRoute — Real-Time Human Flow Orchestration",
  description: "AI-powered predictive crowd intelligence and logistics routing for mega-gatherings and dense urban hubs.", // Updated description
  openGraph: {
    // Added OpenGraph metadata from page.tsx
    title: "AeroRoute — Real-Time Human Flow Orchestration",
    description: "Predictive crowd intelligence and logistics routing for mega-events.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full bg-[#0A0A0A] text-foreground`}>{children}</body>
    </html>
  );
}
