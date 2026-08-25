import HomePageClient from '@/components/pages/HomePageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'I/O FESTIVAL 2026 | Thank You Archive',
  description: 'Photos and partner credits from I/O Festival 2026 at Universitas Tarumanagara by BEM FTI UNTAR.',
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
        description: 'Memories and partner acknowledgements from I/O Festival 2026 by BEM FTI UNTAR.',
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
        description: 'I/O Festival 2026 brought students, judges, partners, and committees together for a national technology festival by BEM FTI UNTAR.',
        startDate: '2026-03-01T08:00:00+07:00',
        endDate: '2026-06-05T18:00:00+07:00',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        eventStatus: 'https://schema.org/EventCompleted',
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
