import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CompetitionPage from '@/components/pages/CompetitionPage';
import { BreadcrumbSchema } from '@/components/shared/BreadcrumbSchema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lomba Web Development Nasional 2026',
    description: 'Tunjukkan keahlian coding Anda di Web Development Competition I/O Festival 2026. Lomba membuat website inovatif untuk Mahasiswa dan SMA/SMK se-Indonesia. Daftar sekarang!',
    keywords: ['Lomba Web Development 2026', 'Kompetisi Pemrograman Web', 'Pendaftaran Lomba Coding', 'I/O Festival 2026', 'Lomba IT Nasional', 'Frontend Competition', 'Fullstack Web Contest Indonesia'],
    openGraph: {
        title: 'Lomba Web Development Nasional | I/O FESTIVAL 2026',
        description: 'Buktikan kemampuan pemrograman web-mu di tingkat nasional. Ikuti kompetisi Web Development bergengsi dengan total hadiah puluhan juta rupiah!',
        url: 'https://iofest.com/kompetisi/web-dev',
    },
    alternates: {
        canonical: 'https://iofest.com/kompetisi/web-dev',
    },
};

export default function WebDevPage() {
    return (
        <main className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full">
            <BreadcrumbSchema 
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Kompetisi', item: '/kompetisi' },
                    { name: 'Web Development', item: '/kompetisi/web-dev' },
                ]} 
            />
            <Navbar />
            <CompetitionPage slug="web-dev" />
            <Footer />
        </main>
    );
}
