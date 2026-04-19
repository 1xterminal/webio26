import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CompetitionPage from '@/components/pages/CompetitionPage';
import { BreadcrumbSchema } from '@/components/shared/BreadcrumbSchema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lomba Business Case Mahasiswa Nasional 2026',
    description: 'Buktikan pemikiran analitis dan strategis tim Anda di Business Case Competition I/O Festival 2026. Kompetisi analisis bisnis tingkat nasional bergengsi untuk Mahasiswa se-Indonesia.',
    keywords: ['Lomba Business Case 2026', 'Kompetisi Bisnis Mahasiswa', 'Studi Kasus Bisnis Nasional', 'Analisis Strategis Bisnis', 'I/O Festival 2026', 'Lomba IT Untar', 'Problem Solving Contest Mahasiswa'],
    openGraph: {
        title: 'Lomba Business Case Mahasiswa Nasional | I/O FESTIVAL 2026',
        description: 'Pecahkan studi kasus bisnis nyata dan buktikan pemikiran strategismu. Ikuti kompetisi Business Case bergengsi tingkat nasional!',
        url: 'https://iofest.com/kompetisi/business-case',
    },
    alternates: {
        canonical: 'https://iofest.com/kompetisi/business-case',
    },
};

export default function BusinessCasePage() {
    return (
        <main className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full">
            <BreadcrumbSchema 
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Kompetisi', item: '/kompetisi' },
                    { name: 'Business Case', item: '/kompetisi/business-case' },
                ]} 
            />
            <Navbar />
            <CompetitionPage slug="business-case" />
            <Footer />
        </main>
    );
}
