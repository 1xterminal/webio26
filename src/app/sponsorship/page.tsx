import { SponsorshipPage } from '@/components/pages/SponsorshipPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sponsorship | I/O Festival 2026',
  description: 'Bermitra dengan kami untuk mendukung inovasi teknologi anak bangsa di I/O Festival 2026 UNTAR.',
};

export default function Page() {
  return <SponsorshipPage />;
}
