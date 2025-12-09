"use client";

import Hero from "@/components/Hero";
import LinkSection from "@/components/LinkSection";
import ProcessSection from "@/components/ProcessSection";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <LinkSection />
      <ProcessSection />
      <CTA />
    </div>
  );
}
