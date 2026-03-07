'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CompetitionPage } from '@/components/pages/CompetitionPage';
import { getCompetition } from '@/lib/competitions';
import { notFound } from 'next/navigation';

export default function UIUXPage() {
    const data = getCompetition('ui-ux');
    if (!data) notFound();

    return (
        <main className="min-h-screen bg-black selection:bg-neon-orange/30 overflow-x-hidden w-full">
            <Navbar />
            <CompetitionPage data={data} />
            <Footer />
        </main>
    );
}
