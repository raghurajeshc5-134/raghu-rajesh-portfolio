'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WorksBanners } from '@/components/WorksBanners';
import { AboutSection } from '@/components/AboutSection';
import { PricingSection } from '@/components/PricingSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export function PortfolioHome() {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <WorksBanners />
        <AboutSection />
        <PricingSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
