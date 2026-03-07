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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://iofest.com/#website',
        url: 'https://iofest.com/',
        name: 'I/O FESTIVAL 2026',
        description: 'Kompetisi IT Nasional Mahasiswa & SMA/SMK',
        publisher: {
          '@type': 'Organization',
          name: 'BEM FTI UNTAR',
        }
      },
      {
        '@type': 'Event',
        name: 'I/O FESTIVAL 2026',
        description: 'I/O Festival 2026 adalah kompetisi IT tingkat nasional bergengsi untuk mahasiswa dan siswa SMA/SMK. Ikuti cabang lomba UI/UX Design, Web Development, dan Business Case.',
        startDate: '2026-03-01T08:00:00+07:00',
        endDate: '2026-06-30T18:00:00+07:00',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'Universitas Tarumanagara',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Letjen S. Parman No.1',
            addressLocality: 'Jakarta Barat',
            postalCode: '11440',
            addressRegion: 'DKI Jakarta',
            addressCountry: 'ID'
          }
        },
        image: ['https://iofest.com/og-image.jpg'],
        organizer: {
          '@type': 'Organization',
          name: 'BEM FTI UNTAR',
          url: 'https://bemftiuntar.com'
        }
      }
    ]
  };

  return (
    <main id="main-content" className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
