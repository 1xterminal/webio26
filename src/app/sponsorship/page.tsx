import { SponsorshipPage } from '@/components/pages/SponsorshipPage';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Sponsorship | I/O Festival 2026 🤝',
  description: 'Bermitra dengan kami untuk menjangkau ribuan talenta IT muda terbaik se-Indonesia. Jadilah bagian dari inovasi teknologi masa depan di I/O Festival 2026 UNTAR! ✨',
  alternates: {
    canonical: '/sponsorship',
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://iofest.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sponsorship',
        item: 'https://iofest.com/sponsorship',
      },
    ],
  };

  return (
    <>
      <Script
        id="sponsorship-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SponsorshipPage />
    </>
  );
}
