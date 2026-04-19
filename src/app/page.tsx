import HomePageClient from '@/components/pages/HomePageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'I/O FESTIVAL 2026 | Technology into Action, Ideas into Impact',
  description: 'Buktikan Inovasi Teknologimu! Ajang kompetisi IT bergengsi skala nasional untuk Mahasiswa & SMA/SMK. Ikuti UI/UX, Web Dev & Business Case.',
};

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
          'https://instagram.com/iofest.untar'
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
        image: ['https://iofest.com/icon.png'],
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
