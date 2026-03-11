import { CaseCollabPage } from '@/components/pages/CaseCollabPage';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Case Collaborators | I/O Festival 2026 💡',
  description: 'Berkolaborasi dengan kami untuk memberikan tantangan studi kasus nyata bagi inovator muda. Temukan solusi brilian untuk bisnis Anda di I/O Festival 2026 UNTAR! 🚀',
  alternates: {
    canonical: '/casecollab',
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
        name: 'Case Collaborators',
        item: 'https://iofest.com/casecollab',
      },
    ],
  };

  return (
    <>
      <Script
        id="casecollab-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseCollabPage />
    </>
  );
}
