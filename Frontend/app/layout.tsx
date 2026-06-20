import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#00E676", // Matches your emerald color theme
};

export const metadata: Metadata = {
  // Main SEO information
  metadataBase: new URL("https://aeroroute.com"), // IMPORTANT: Replace with your actual domain
  title: {
    default: "AeroRoute -Real-Time Human Flow Orchestration",
    template: "%s | AeroRoute", // Allows page.tsx to set a specific title which will be appended with "| AeroRoute"
  },
  description:
    "AeroRoute provides AI-powered predictive crowd intelligence and logistics routing for mega-gatherings, dense urban hubs, and large-scale events. Optimize human flow with real-time data, offline-first capabilities, and dynamic re-routing.",
  applicationName: "AeroRoute Orchestration OS",
  authors: [{ name: "AeroRoute Team" }], // Replace with actual author names if applicable
  creator: "AeroRoute Team", // Replace with actual creator
  publisher: "AeroRoute Inc.", // Replace with actual publisher
  keywords: [
    "AeroRoute",
    "Human Flow Orchestration",
    "Crowd Intelligence",
    "Logistics Routing",
    "Mega-Gatherings",
    "Event Management",
    "Predictive AI",
    "Real-Time Data",
    "Offline-First",
    "Traffic Management",
    "Smart City",
    "Urban Mobility",
  ],
  alternates: {
    canonical: "/", // This indicates the canonical URL for the homepage. For other pages, this would be '/path-to-page'
  },

  // Open Graph (Social Media) metadata
  openGraph: {
    title: "AeroRoute -Real-Time Human Flow Orchestration",
    description:
      "AI-powered predictive crowd intelligence and logistics routing for mega-gatherings and dense urban hubs. Optimize human flow with AeroRoute.",
    url: "https://aeroroute.com", // IMPORTANT: Replace with your actual domain
    siteName: "AeroRoute",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "AeroRoute: Human Flow Orchestration" }, // IMPORTANT: Create and upload an OG image
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@AeroRouteHQ", // IMPORTANT: Replace with your Twitter handle
    creator: "@AeroRouteHQ", // IMPORTANT: Replace with your Twitter handle
    title: "AeroRoute -Human Flow Intelligence",
    description:
      "Real-time human flow orchestration for large events and urban environments. Predictive AI, offline-first tech, and dynamic logistics.",
    images: [
      { url: "/twitter-image.jpg", width: 1200, height: 675, alt: "AeroRoute: Human Flow Intelligence" }, // IMPORTANT: Create and upload a Twitter image
    ],
  },

  manifest: "/site.webmanifest", // If you have a PWA manifest
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`${jakarta.variable} ${bricolage.variable} antialiased min-h-full bg-[#0A0A0A] text-foreground`}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root { --font-sans: var(--font-jakarta); }
            body, .font-sans { font-family: var(--font-jakarta), sans-serif !important; }
            h1, h2, h3, h4, h5, h6, .font-heading { font-family: var(--font-bricolage), sans-serif !important; }
            .num { font-family: var(--font-bricolage), sans-serif !important; font-variant-numeric: tabular-nums; }
          `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
