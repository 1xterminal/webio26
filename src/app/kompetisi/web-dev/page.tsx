import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CompetitionPage from '@/components/pages/CompetitionPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Web Development Competition',
    description: 'Tunjukkan keahlian coding Anda di Web Development Competition I/O Festival 2026. Lomba membuat website inovatif untuk SMA/SMK dan Mahasiswa se-Indonesia.',
    keywords: ['Web Development', 'Lomba Web', 'Kompetisi Pemrograman', 'Coding', 'Frontend', 'Backend', 'Fullstack', 'I/O Festival', 'Mahasiswa', 'SMA SMK'],
    openGraph: {
        title: 'Web Development Competition | I/O FESTIVAL 2026',
        description: 'Buktikan kemampuan pemrograman web-mu di tingkat nasional. Ikuti kompetisi Web Development bergengsi!',
        url: 'https://iofest.com/kompetisi/web-dev',
    },
    alternates: {
        canonical: 'https://iofest.com/kompetisi/web-dev',
    },
};

export default function WebDevPage() {
    return (
        <main className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full">
            <Navbar />
            <CompetitionPage slug="web-dev" />
            <Footer />
        </main>
    );
}
