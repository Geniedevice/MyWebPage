import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothWrapper from "@/components/SmoothWrapper";
import GravityBackground from "@/components/GravityBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Genie | Anti-Gravity Portfolio",
  description: "Game Client Programmer Portfolio. Anti-Gravity & Parallax Experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-space-black text-star-white overflow-x-hidden`}
      >
        <SmoothWrapper>
          <GravityBackground />
          <div className="relative z-10 w-full min-h-screen">
            {children}
          </div>
        </SmoothWrapper>
      </body>
    </html>
  );
}
