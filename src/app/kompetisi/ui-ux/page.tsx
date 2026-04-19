import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CompetitionPage from '@/components/pages/CompetitionPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UI/UX Design Competition',
    description: 'Tantang kreativitas dan kemampuan problem solving Anda di UI/UX Design Competition I/O Festival 2026. Kompetisi nasional untuk SMA/SMK dan Mahasiswa. Daftar sekarang!',
    keywords: ['UI/UX Design', 'Lomba Desain Aplikasi', 'Kompetisi UI UX', 'Lomba Nasional', 'I/O Festival', 'Mahasiswa', 'SMA SMK', 'Design Thinking', 'Wireframing', 'Prototyping'],
    openGraph: {
        title: 'UI/UX Design Competition | I/O FESTIVAL 2026',
        description: 'Tantang kreativitas Anda dalam mendesain solusi antarmuka terbaik. Ikuti kompetisi UI/UX Design tingkat nasional!',
        url: 'https://iofest.com/kompetisi/ui-ux',
    },
    alternates: {
        canonical: 'https://iofest.com/kompetisi/ui-ux',
    },
};

export default function UIUXPage() {
    return (
        <main className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full">
            <Navbar />
            <CompetitionPage slug="ui-ux" />
            <Footer />
        </main>
    );
}
