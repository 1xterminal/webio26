'use client';

import dynamic from 'next/dynamic';
import { FEATURES } from '@/lib/constants';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/layout/Footer';

// Static imports for better build performance (they are already Client Components internally)
import { About } from '@/components/sections/About';
import { Tracks, PPTIBCABanner } from '@/components/sections/Tracks';
import { Timeline } from '@/components/sections/Timeline';
import { Prizes } from '@/components/sections/Prizes';
import { Sponsors } from '@/components/sections/Sponsors';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import SponsorshipCTA from '@/components/sections/SponsorshipCTA';

// Retain dynamic(ssr: false) ONLY for heavy WebGL/Canvas effects to protect SSR
const Gallery = dynamic(() => import('@/components/sections/Gallery').then(mod => mod.default), { ssr: false });
const StarDust = dynamic(() => import('@/components/effects/StarDust').then(mod => mod.default), { ssr: false });

export default function HomePageClient() {
  return (
    <main className="min-h-screen bg-black relative">
      <StarDust />
      <Navbar />
      <Hero />
      <div className="relative -mt-20 z-10">
        <About />
      </div>
      <div className="relative z-0 mt-8 md:mt-16">
        <Gallery />
      </div>
      <Tracks />
      <Prizes />
      {FEATURES.SHOW_PPTI_BCA_PROMO && <PPTIBCABanner />}
      <Timeline />

      <FAQ />
      <Sponsors />
      <SponsorshipCTA />
      <CTA />
      <Footer />
    </main>
  );
}
