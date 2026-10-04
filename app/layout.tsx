import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Manrope } from "next/font/google";

import { SanityLive } from "@/sanity/lib/live";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
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
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
