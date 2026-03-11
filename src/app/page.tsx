'use client';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

const Gallery = dynamic(() => import('@/components/sections/Gallery'), { ssr: false });
const About = dynamic(() => import('@/components/sections/About').then(mod => mod.About), { ssr: false });
const Tracks = dynamic(() => import('@/components/sections/Tracks').then(mod => mod.Tracks), { ssr: false });
const Timeline = dynamic(() => import('@/components/sections/Timeline').then(mod => mod.Timeline), { ssr: false });
const Prizes = dynamic(() => import('@/components/sections/Prizes').then(mod => mod.Prizes), { ssr: false });
const Sponsors = dynamic(() => import('@/components/sections/Sponsors').then(mod => mod.Sponsors), { ssr: false });
const FAQ = dynamic(() => import('@/components/sections/FAQ').then(mod => mod.FAQ), { ssr: false });
const CTA = dynamic(() => import('@/components/sections/CTA').then(mod => mod.CTA), { ssr: false });
const SponsorshipCTA = dynamic(() => import('@/components/sections/SponsorshipCTA'), { ssr: false });
const StarDust = dynamic(() => import('@/components/effects/StarDust'), { ssr: false });

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://iofest.com/#website',
        url: 'https://iofest.com/',
        name: 'I/O FESTIVAL 2026',
        description: 'Buktikan Inovasi Teknologimu! Ajang kompetisi IT bergengsi skala nasional untuk Mahasiswa & SMA/SMK.',
        publisher: {
          '@id': 'https://iofest.com/#organization'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://iofest.com/#organization',
        name: 'BEM FTI UNTAR',
        url: 'https://bemftiuntar.com',
        logo: 'https://iofest.com/icon.png',
        sameAs: [
          'https://instagram.com/iofestival'
        ]
      },
      {
        '@type': 'Event',
        name: 'I/O FESTIVAL 2026',
        description: 'I/O Festival 2026 adalah kompetisi IT tingkat nasional bergengsi untuk mahasiswa dan siswa SMA/SMK. Ikuti cabang lomba UI/UX Design, Web Development, dan Business Case dengan total hadiah puluhan juta rupiah.',
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
          '@id': 'https://iofest.com/#organization'
        },
        offers: {
          '@type': 'Offer',
          url: 'https://iofest.com/kompetisi',
          priceCurrency: 'IDR',
          price: '0',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-03-01T08:00:00+07:00'
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-black relative">
      {/* Background system now handled inside Hero for better hydration performance */}
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
      <div className="hidden">
        <Sponsors />
      </div>
      <FAQ />
      <SponsorshipCTA />
      <CTA />
      <Footer />
    </main>
  );
}
