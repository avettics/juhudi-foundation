import type { Metadata } from "next";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SanityLive } from "@/sanity/lib/live";

import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/dm-sans-latin-variable.woff2",
  weight: "100 1000",
  style: "normal",
  variable: "--font-heading",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  // Monospace is available through font-mono but unused on the homepage.
  preload: false,
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Juhudi Foundation",
    template: "%s | Juhudi Foundation",
  },
  description:
    "Juhudi Foundation empowers youth and women through education, mentorship, leadership development, skills training, innovation, and community engagement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:text-foreground focus:ring-2 focus:ring-primary"
        >
          Skip to content
        </a>
        <SiteHeader />

        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 scroll-mt-20"
        >
          {children}
        </main>

        <SiteFooter />

        <SanityLive />
      </body>
    </html>
  );
}
