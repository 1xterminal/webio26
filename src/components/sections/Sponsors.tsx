'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import { DATES } from '@/lib/constants';
import { CaseRevealCountdown } from '@/components/shared/CaseRevealCountdown';

interface SponsorLogo {
    name: string;
    width: number;
    height: number;
    src?: string;
    multiSrc?: { src: string; width: number; height: number; name: string; href?: string }[];
    href?: string;
    boxLabel?: string;
}

const sponsorTiers: { tierName: string; logos: SponsorLogo[] }[] = [
    {
        tierName: 'Diamond',
        logos: [
            {
                name: 'Festival Partner',
                width: 280,
                height: 280,
                boxLabel: 'Festival Partner',
                multiSrc: [
                    { src: '/assets/sponsors/DIAMOND/FESTIVAL PARTNER/v3 production.png', width: 280, height: 140, name: 'V3 Production' },
                    { src: '/assets/sponsors/DIAMOND/FESTIVAL PARTNER/TokoTekno_putih.png', width: 280, height: 140, name: 'TokoTekno' },
                    { src: '/assets/sponsors/DIAMOND/FESTIVAL PARTNER/lamzu_putih.png', width: 280, height: 140, name: 'Lamzu', href: 'https://www.instagram.com/lamzu.indonesia/' },
                    { src: '/assets/sponsors/DIAMOND/FESTIVAL PARTNER/yunzi_putih.png', width: 280, height: 140, name: 'Yunzi' },
                ],
            },
            {
                name: 'Secret',
                width: 280,
                height: 140,
                href: 'https://www.instagram.com/lifeatbca/',
                src: '/assets/sponsors/DIAMOND/OFFICIAL CASE COLLABORATOR/bca.png',
                boxLabel: 'Case Collaborator',
            },
            {
                name: 'Archipelago',
                width: 280,
                height: 140,
                src: '/assets/sponsors/DIAMOND/OFFICIAL APPAREL/archipelago.png',
                boxLabel: 'Official Apparel',
            },
        ],
    },
    {
        tierName: 'Platinum',
        logos: [
            { name: 'Seindonesia', width: 280, height: 140, src: '/assets/sponsors/PLATINUM/seindonesia.png' },
            { name: 'Digisnap', width: 280, height: 140, src: '/assets/sponsors/PLATINUM/digisnap.png', href: 'https://linktr.ee/digisnap.id' },
        ],
    },
    {
        tierName: 'Gold',
        logos: [
            { name: 'Rumah Nenek', width: 240, height: 120, src: '/assets/sponsors/GOLD/rumah nenek.png' },
        ],
    },
    {
        tierName: 'Silver',
        logos: [
            { name: 'Alleyway Muse', width: 160, height: 80, src: '/assets/sponsors/SILVER/alleyway.png', href: 'https://www.instagram.com/alleyway.muse/' },
            { name: 'JND Dimsum', width: 160, height: 80, src: '/assets/sponsors/SILVER/jnd.png', href: 'https://www.instagram.com/jnd_dimsum/' },
            { name: 'Anamcara', width: 200, height: 120, src: '/assets/sponsors/SILVER/anamcara.png', href: 'https://wa.me/6282297771594' },
            { name: 'Cendol Duren', width: 160, height: 80, src: '/assets/sponsors/SILVER/cendol duren.png' },
            { name: 'Djadul Cake', width: 180, height: 100, src: '/assets/sponsors/SILVER/djadoel cake.png' },
            { name: 'Nailboo', width: 180, height: 100, src: '/assets/sponsors/SILVER/nailboo.png' },
            { name: 'Suki Bento', width: 180, height: 100, src: '/assets/sponsors/SILVER/suki suki bento.png' },
            { name: 'Unomi', width: 180, height: 100, src: '/assets/sponsors/SILVER/unomi.png' },
            { name: 'Dooble G', width: 160, height: 80, src: '/assets/sponsors/SILVER/dooble g.png' },
            { name: 'Es Teh Makassar', width: 160, height: 80, src: '/assets/sponsors/SILVER/es teh makassar.png' },
            { name: 'Hoky Food', width: 160, height: 80, src: '/assets/sponsors/SILVER/hoky food.png' },
            { name: 'Jacks Hotdog', width: 160, height: 80, src: '/assets/sponsors/SILVER/jacks hotdog.png' },
            { name: 'Khong Thai Tea', width: 160, height: 80, src: '/assets/sponsors/SILVER/khong thai tea.png' },
        ],
    },
];

const featuredPartners = sponsorTiers[0].logos;
const supportingPartners = sponsorTiers.slice(1).flatMap((tier) => tier.logos);

export function Sponsors() {
    const [isPastRevealDate, setIsPastRevealDate] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsMounted(true);
            setIsPastRevealDate(new Date() >= DATES.OFFICIAL_CASE_RELEASE);
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const festivalPartner = featuredPartners.find((partner) => partner.multiSrc);
    const caseCollaborator = featuredPartners.find((partner) => partner.boxLabel === 'Case Collaborator');
    const officialApparel = featuredPartners.find((partner) => partner.boxLabel === 'Official Apparel');

    return (
        <section className="relative overflow-hidden px-5 py-20 md:px-10 md:py-32" aria-labelledby="sponsors-title">
            <div className="mx-auto max-w-[1400px]">
                <div className="border-b border-white/15 pb-7 md:pb-9">
                    <h2 id="sponsors-title" className="font-raela text-5xl font-black uppercase leading-none tracking-[-0.04em] md:text-8xl">
                        Sponsored <span className="text-white/35">by</span>
                    </h2>
                </div>

                <div className="mt-10">
                    {festivalPartner?.multiSrc && (
                        <PartnerLine label="Festival Partner" className="border-t-0 md:grid-cols-[190px_1fr]">
                            <div className="grid grid-cols-2 items-center gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-10">
                                {festivalPartner.multiSrc.map((partner) => {
                                    const image = (
                                        <Image
                                            src={partner.src}
                                            alt={partner.name}
                                            width={partner.width * 2}
                                            height={partner.height * 2}
                                            priority
                                            className={'h-auto max-h-16 w-auto max-w-full object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100 md:max-h-20 ' + (partner.name === 'V3 Production' ? 'md:scale-125 lg:scale-150' : '')}
                                        />
                                    );

                                    if (!partner.href) return <div key={partner.name}>{image}</div>;

                                    return (
                                        <a
                                            key={partner.name}
                                            href={partner.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={'Visit ' + partner.name + ' on Instagram'}
                                            className="group flex items-center justify-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#55D5E7]"
                                            onClick={() => {
                                                sendGAEvent('event', 'click_sponsor_logo', {
                                                    sponsor_name: partner.name,
                                                    destination: partner.href,
                                                });
                                            }}
                                        >
                                            {image}
                                        </a>
                                    );
                                })}
                            </div>
                        </PartnerLine>
                    )}

                    <div className="grid md:grid-cols-2">
                        {caseCollaborator && (
                            <PartnerLine label="Case Collaborator" className="md:border-r md:border-white/15">
                                <SponsorMark logo={caseCollaborator} isMounted={isMounted} isPastRevealDate={isPastRevealDate} featured />
                            </PartnerLine>
                        )}
                        {officialApparel && (
                            <PartnerLine label="Official Apparel" className="min-w-0 md:pl-8 md:pr-8 lg:pl-10 lg:pr-12">
                                <SponsorMark logo={officialApparel} isMounted={isMounted} isPastRevealDate={isPastRevealDate} featured />
                            </PartnerLine>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center gap-x-5 gap-y-8 py-12 sm:grid-cols-3 md:grid-cols-4 md:gap-x-10 md:gap-y-12 lg:grid-cols-6">
                    {supportingPartners.map((logo) => (
                        <SponsorMark key={logo.name} logo={logo} isMounted={isMounted} isPastRevealDate={isPastRevealDate} />
                    ))}
                </div>

                {isMounted && !isPastRevealDate && (
                    <div className="border-t border-white/15 pt-8 text-center">
                        <p className="font-jakarta text-xs uppercase tracking-[0.18em] text-white/45">Case collaborator reveal</p>
                        <div className="mt-4 flex justify-center">
                            <CaseRevealCountdown accentColor="#55D5E7" size="md" showGlass={false} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function PartnerLine({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
    return (
        <div className={'grid min-w-0 gap-5 py-8 md:items-center md:gap-10 md:py-10 ' + className}>
            <p className="font-jakarta text-[10px] font-semibold uppercase tracking-[0.2em] text-[#55D5E7]">{label}</p>
            <div className="flex min-h-16 min-w-0 items-center">{children}</div>
        </div>
    );
}

function SponsorMark({ logo, isMounted, isPastRevealDate, featured = false }: { logo: SponsorLogo; isMounted: boolean; isPastRevealDate: boolean; featured?: boolean }) {
    const isSecret = logo.name === 'Secret';
    const shouldReveal = isSecret && isMounted && isPastRevealDate;
    const imageSrc = shouldReveal || !isSecret ? logo.src : undefined;
    const imageAlt = shouldReveal ? 'BCA' : logo.name;
    const image = imageSrc ? (
        <Image
            src={imageSrc}
            alt={imageAlt}
            width={(shouldReveal ? 300 : logo.width) * 2}
            height={(shouldReveal ? 150 : logo.height) * 2}
            className={featured ? 'h-auto max-h-20 w-auto max-w-full object-contain opacity-75 transition-opacity duration-300 group-hover:opacity-100 md:max-h-24' : 'h-auto max-h-14 w-auto max-w-full object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100 md:max-h-16'}
        />
    ) : (
        <span className="font-raela text-3xl font-black text-white/45 md:text-4xl">?</span>
    );

    if (!logo.href || (isSecret && !shouldReveal)) {
        return <div className="flex w-full items-center justify-center">{image}</div>;
    }

    return (
        <a
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={'Visit ' + imageAlt}
            className="group flex w-full items-center justify-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#55D5E7]"
            onClick={() => {
                sendGAEvent('event', 'click_sponsor_logo', {
                    sponsor_name: isSecret ? 'BCA' : logo.name,
                    destination: logo.href,
                });
            }}
        >
            {image}
        </a>
    );
}
