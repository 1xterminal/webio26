import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CompetitionPage from '@/components/pages/CompetitionPage';
import { BreadcrumbSchema } from '@/components/shared/BreadcrumbSchema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lomba UI/UX Design Nasional 2026',
    description: 'Tantang kreativitas dan kemampuan problem solving Anda di UI/UX Design Competition I/O Festival 2026. Kompetisi nasional bergengsi untuk Mahasiswa dan SMA/SMK se-Indonesia. Daftar sekarang!',
    keywords: ['Lomba UI/UX 2026', 'Kompetisi UI UX Nasional', 'Pendaftaran Lomba Desain Aplikasi', 'I/O Festival 2026', 'Lomba IT Mahasiswa', 'Lomba IT SMA SMK', 'Design Thinking Competition', 'Prototyping Contest Indonesia'],
    openGraph: {
        title: 'Lomba UI/UX Design Nasional | I/O FESTIVAL 2026',
        description: 'Tantang kreativitas Anda dalam mendesain solusi antarmuka terbaik. Ikuti kompetisi UI/UX Design tingkat nasional dengan total hadiah puluhan juta rupiah!',
        url: 'https://iofest.com/kompetisi/ui-ux',
    },
    alternates: {
        canonical: 'https://iofest.com/kompetisi/ui-ux',
    },
};

export default function UIUXPage() {
    return (
        <main className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full">
            <BreadcrumbSchema 
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Kompetisi', item: '/kompetisi' },
                    { name: 'UI/UX Design', item: '/kompetisi/ui-ux' },
                ]} 
            />
            <Navbar />
            <CompetitionPage slug="ui-ux" />
            <Footer />
        </main>
    );
}
