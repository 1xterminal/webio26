import { ImpactPage } from '@/components/pages/ImpactPage';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Impact Projection | I/O Festival 2026 🎯',
  description: 'Memahami apa itu Impact Projection. Kejelasan masalah yang diangkat dan ketepatan solusi dalam menjawab akar permasalahan. Penilaian berfokus pada seberapa terukur, realistis (tidak overclaim), dan aplikatif gagasan yang ditawarkan.',
  alternates: {
    canonical: '/impact',
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
        name: 'Impact Projection',
        item: 'https://iofest.com/impact',
      },
    ],
  };

  return (
    <>
      <Script
        id="impact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImpactPage />
    </>
  );
}
