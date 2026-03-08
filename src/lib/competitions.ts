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
            { name: 'NAMA CP 1', whatsapp: '6281234567890', line: 'linecp1' },
            { name: 'NAMA CP 2', whatsapp: '6281234567891', line: 'linecp2' }
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
            { name: 'NAMA CP 3', whatsapp: '6281234567892', line: 'linecp3' },
            { name: 'NAMA CP 4', whatsapp: '6281234567893', line: 'linecp4' }
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
            { name: 'NAMA CP 5', whatsapp: '6281234567894', line: 'linecp5' },
            { name: 'NAMA CP 6', whatsapp: '6281234567895', line: 'linecp6' }
        ],
        rulebookUrl: '#',
        submissionUrl: '#',
    },
];

export function getCompetition(slug: string): CompetitionData | undefined {
    return competitions.find((c) => c.slug === slug);
}
