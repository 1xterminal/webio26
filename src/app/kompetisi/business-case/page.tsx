import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CompetitionPage from '@/components/pages/CompetitionPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Business Case Competition',
    description: 'Buktikan pemikiran analitis dan strategis tim Anda di Business Case Competition I/O Festival 2026. Kompetisi analisis bisnis tingkat nasional untuk Mahasiswa.',
    keywords: ['Business Case', 'Lomba Bisnis', 'Kompetisi Bisnis Mahasiswa', 'Studi Kasus Bisnis', 'Analisis Data', 'Problem Solving', 'I/O Festival', 'Nasional', 'Tarumanagara'],
    openGraph: {
        title: 'Business Case Competition | I/O FESTIVAL 2026',
        description: 'Pecahkan studi kasus bisnis nyata dan buktikan pemikiran strategismu. Ikuti kompetisi Business Case bergengsi untuk mahasiswa tingkat nasional.',
        url: 'https://iofest.com/kompetisi/business-case',
    },
    alternates: {
        canonical: 'https://iofest.com/kompetisi/business-case',
    },
};

export default function BusinessCasePage() {
    return (
        <main className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full">
            <Navbar />
            <CompetitionPage slug="business-case" />
            <Footer />
        </main>
    );
}
