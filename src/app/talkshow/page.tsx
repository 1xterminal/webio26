import { TalkshowPage } from '@/components/pages/TalkshowPage';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Talkshow | I/O Festival 2026',
  description: 'Saksikan pandangan eksklusif tentang masa depan teknologi langsung dari praktisi industri terkemuka. Free Entry!',
  alternates: {
    canonical: '/talkshow',
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'I/O Festival 2026 Talkshow',
    startDate: '2026-06-05T08:30:00+07:00',
    endDate: '2026-06-05T09:40:00+07:00',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'Auditorium Gedung M Lt. 8',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Universitas Tarumanagara',
        addressLocality: 'Jakarta',
        addressCountry: 'ID'
      }
    },
    performer: {
      '@type': 'Person',
      name: 'Ibnu Sina Wardy',
      jobTitle: 'Founder',
      affiliation: {
        '@type': 'Organization',
        name: 'GITS.id'
      }
    },
    offers: {
      '@type': 'Offer',
      url: 'https://bit.ly/IOFest26Talkshow',
      price: '0',
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-05-08T00:00:00+07:00'
    },
    description: 'Saksikan pandangan eksklusif tentang masa depan teknologi langsung dari praktisi industri terkemuka.'
  };

  return (
    <>
      <Script
        id="talkshow-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TalkshowPage />
    </>
  );
}
