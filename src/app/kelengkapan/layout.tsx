import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kelengkapan Peserta',
    description: 'Download semua dokumen yang dibutuhkan untuk mengikuti I/O Festival 2026: formulir pendaftaran, rulebook, surat originalitas, twibbon, dan logo resmi.',
    keywords: ['kelengkapan peserta', 'daftar lomba', 'formulir pendaftaran', 'rulebook', 'I/O Festival 2026', 'download'],
    openGraph: {
        title: 'Kelengkapan Peserta | I/O FESTIVAL 2026',
        description: 'Download semua dokumen pendaftaran dan kelengkapan lomba I/O Festival 2026.',
        url: 'https://iofest.com/kelengkapan',
    },
};

export default function KelengkapanLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
