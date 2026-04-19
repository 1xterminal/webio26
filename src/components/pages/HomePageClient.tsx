'use client';

import dynamic from 'next/dynamic';
import { FEATURES } from '@/lib/constants';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/layout/Footer';

// Dynamic imports with ssr: false are allowed here because this is a Client Component
const Gallery = dynamic(() => import('@/components/sections/Gallery').then(mod => mod.default), { ssr: false });
const About = dynamic(() => import('@/components/sections/About').then(mod => mod.About), { ssr: false });
const Tracks = dynamic(() => import('@/components/sections/Tracks').then(mod => mod.Tracks), { ssr: false });
const PPTIBCABanner = dynamic(() => import('@/components/sections/Tracks').then(mod => mod.PPTIBCABanner), { ssr: false });
const Timeline = dynamic(() => import('@/components/sections/Timeline').then(mod => mod.Timeline), { ssr: false });
const Prizes = dynamic(() => import('@/components/sections/Prizes').then(mod => mod.Prizes), { ssr: false });
const Sponsors = dynamic(() => import('@/components/sections/Sponsors').then(mod => mod.Sponsors), { ssr: false });
const FAQ = dynamic(() => import('@/components/sections/FAQ').then(mod => mod.FAQ), { ssr: false });
const CTA = dynamic(() => import('@/components/sections/CTA').then(mod => mod.CTA), { ssr: false });
const SponsorshipCTA = dynamic(() => import('@/components/sections/SponsorshipCTA').then(mod => mod.default), { ssr: false });
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
