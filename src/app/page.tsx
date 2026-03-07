import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

const Gallery = dynamic(() => import('@/components/sections/Gallery').then(mod => mod.Gallery));
const About = dynamic(() => import('@/components/sections/About').then(mod => mod.About));
const Tracks = dynamic(() => import('@/components/sections/Tracks').then(mod => mod.Tracks));
const Timeline = dynamic(() => import('@/components/sections/Timeline').then(mod => mod.Timeline));
const Prizes = dynamic(() => import('@/components/sections/Prizes').then(mod => mod.Prizes));
const Sponsors = dynamic(() => import('@/components/sections/Sponsors').then(mod => mod.Sponsors));
const FAQ = dynamic(() => import('@/components/sections/FAQ').then(mod => mod.FAQ));
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact));
const CTA = dynamic(() => import('@/components/sections/CTA').then(mod => mod.CTA));
const MediaPartners = dynamic(() => import('@/components/sections/MediaPartners').then(mod => mod.MediaPartners));
const StarDust = dynamic(() => import('@/components/effects/StarDust').then(mod => mod.StarDust));

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full">
      <StarDust />
      <Navbar />
      <Hero />
      <div className="relative -mt-20 z-0">
        <Gallery />
      </div>
      <div className="relative -mt-20 z-10">
        <About />
      </div>
      <Tracks />
      <Prizes />
      <Timeline />
      <Sponsors />
      <FAQ />
      <Contact />
      <CTA />
      <MediaPartners />
      <Footer />
    </main>
  );
}
