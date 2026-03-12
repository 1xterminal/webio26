import * as React from 'react';
import { type SVGProps } from 'react';
import { UIUXIcon } from '@/components/ui/icons/UIUXIcon';
import { WebDevIcon } from '@/components/ui/icons/WebDevIcon';
import { BusinessCaseIcon } from '@/components/ui/icons/BusinessCaseIcon';

export interface CompetitionFee {
    type: string;
    early: string;
    regular: string;
}

export interface CompetitionContact {
    name: string;
    whatsapp: string;
    line: string;
    role?: string[];
}

export interface CompetitionDetails {
    categories: string;
    fee: CompetitionFee[];
    prizes: string;
}

export interface CompetitionData {
    slug: string;
    title: string;
    shortTitle: string;
    icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
    color: string;
    accentHex: string;
    badge?: string;
    tagline: string;
    description: string;
    details: CompetitionDetails;
    contacts: CompetitionContact[];
    rulebookUrl?: string;
    submissionUrl?: string;
    tags?: string[];
}

export const competitions: CompetitionData[] = [
    {
        slug: 'ui-ux',
        title: 'UI/UX Design',
        shortTitle: 'UI/UX',
        icon: UIUXIcon,
        color: 'from-neon-purple to-purple-600',
        accentHex: '#A856EE', // Value taken from the SVG definition
        badge: 'Popular',
        tags: ['SMA/SMK', 'Mahasiswa', 'Umum'],
        tagline: 'Design interfaces that solve problems.',
        description:
            'Peserta UI/UX Design akan merancang antarmuka dan pengalaman pengguna. Desain harus estetis dan bermanfaat bagi masyarakat. Peserta wajib memilih satu sub-tema dan membuat solusi digital.',
        details: {
            categories: 'Mahasiswa / Siswa SMA/K (Tim Maks. 3 Orang)',
            fee: [
                { type: 'SMA/SMK', early: 'Rp 55.000', regular: 'Rp 70.000' },
                { type: 'Mahasiswa', early: 'Rp 60.000', regular: 'Rp 80.000' }
            ],
            prizes: 'Uang Tunai & E-Sertifikat',
        },
        contacts: [
            { name: 'Felicia Rivera', whatsapp: '6281383763005', line: 'riverraa', role: ['Mahasiswa', 'Umum'] },
            { name: 'Sheireen Sadeli', whatsapp: '6285890581118', line: 'sheireensadel', role: ['SMA/SMK'] }
        ],
        rulebookUrl: '#',
        submissionUrl: '#',
    },
    {
        slug: 'web-dev',
        title: 'Web Development',
        shortTitle: 'Web Dev',
        icon: WebDevIcon,
        color: 'from-neon-blue to-blue-600',
        accentHex: '#1DBCD3', // Value taken from the SVG definition
        tags: ['SMA/SMK', 'Mahasiswa', 'Umum'],
        tagline: 'Build web applications that solve problems.',
        description:
            'Peserta Web Development akan membangun aplikasi web yang fungsional. Kompetisi ini menguji kemampuan pemrograman dan pemecahan masalah. Aplikasi harus mampu mengatasi kendala di dunia nyata.',
        details: {
            categories: 'Mahasiswa / Siswa SMA/K (Tim Maks. 3 Orang)',
            fee: [
                { type: 'SMA/SMK', early: 'Rp 55.000', regular: 'Rp 70.000' },
                { type: 'Mahasiswa', early: 'Rp 60.000', regular: 'Rp 80.000' }
            ],
            prizes: 'Uang Tunai & E-Sertifikat',
        },
        contacts: [
            { name: 'Rein Mark Manopo', whatsapp: '628989364118', line: 'markreeen', role: ['Mahasiswa', 'Umum'] },
            { name: 'Christian Benizi Susilo', whatsapp: '6281354629105', line: 'bennzzy', role: ['SMA/SMK'] }
        ],
        rulebookUrl: '#',
        submissionUrl: '#',
    },
    {
        slug: 'business-case',
        title: 'Business Case',
        shortTitle: 'Business Case',
        icon: BusinessCaseIcon,
        color: 'from-neon-orange to-orange-600',
        accentHex: '#FF8B53', // Value taken from the SVG definition
        badge: 'New',
        tags: ['Mahasiswa', 'Umum'],
        tagline: 'Create business plans with clear potential.',
        description:
            'Peserta Business Case akan menyusun rencana bisnis berbasis teknologi. Solusi peserta harus memiliki dampak sosial. Peserta wajib membuktikan kelayakan finansial dari desain bisnis tersebut.',
        details: {
            categories: 'Mahasiswa (Tim Maks. 3 Orang)',
            fee: [
                { type: 'Mahasiswa', early: 'Rp 60.000', regular: 'Rp 80.000' }
            ],
            prizes: 'Uang Tunai & E-Sertifikat',
        },
        contacts: [
            { name: 'Clive Ang', whatsapp: '6285370587170', line: 'cliveang2008', role: ['Mahasiswa', 'Umum'] }
        ],
        rulebookUrl: '#',
        submissionUrl: '#',
    },
];

export function getCompetition(slug: string): CompetitionData | undefined {
    return competitions.find((c) => c.slug === slug);
}
