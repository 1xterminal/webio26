'use client';

import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, Instagram, Mail } from 'lucide-react';
import { Navbar, type NavItem } from '@/components/layout/Navbar';
import { Sponsors } from '@/components/sections/Sponsors';
import Gallery from '@/components/sections/Gallery';
import { ARCHIVE_COPY } from '@/lib/constants';

const archiveNavItems: NavItem[] = [
  { name: 'Memories', href: '#memories', isHighlight: false, tone: 'default' },
  { name: 'Partners', href: '#partners', isHighlight: false, tone: 'default' },
  { name: 'Contact', href: '#contact', isHighlight: false, tone: 'default' },
];

const archiveSectionIds = ['memories', 'partners', 'contact'] as const;

export default function HomePageClient() {
  const activeHref = useArchiveSection();

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar
        items={archiveNavItems}
        showRegistration={false}
        ariaLabel="Archive navigation"
        logoAriaLabel="I/O Festival 2026 archive home"
        logoSize="compact"
        centerItems
        activeHref={activeHref}
      />
      <div className="relative z-10">
        <ThankYouHero />
        <MemoryAtlasSection />
        <div id="partners" className="scroll-mt-20">
          <Sponsors />
        </div>
        <ArchiveFooter />
      </div>
    </main>
  );
}

function useArchiveSection() {
  const [activeHref, setActiveHref] = useState<string>();

  useEffect(() => {
    const sections = archiveSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) setActiveHref(`#${visibleSection.target.id}`);
      },
      { rootMargin: '-20% 0px -62% 0px', threshold: [0, 0.1, 0.25] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeHref;
}

function ThankYouHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-white/10 bg-[#050505] px-5 pb-5 pt-24 text-white md:px-[5vw] md:pb-7 md:pt-28">
      <div className="relative mx-auto flex min-h-[calc(100svh-7.25rem)] max-w-[1800px] flex-col">
        <div className="grid flex-1 items-center gap-10 py-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14 lg:py-6 xl:gap-20">
          <div className="order-1 relative z-10 lg:order-1">
            <h1 className="max-w-[6.5ch] font-raela text-[clamp(5rem,11vw,12rem)] font-black uppercase leading-[0.78] tracking-[-0.045em] text-white">
              <span className="block">Thank</span>
              <span className="block">you.</span>
            </h1>

            <p className="mt-7 max-w-[33rem] font-jakarta text-[15px] leading-[1.55] text-white/68 sm:text-base md:mt-9 md:text-[17px]">
              I/O Festival 2026 is over. Thank you for building, judging, supporting, and showing up.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-jakarta text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48 md:mt-9 md:text-[11px]">
              <span>04—05 June 2026</span>
              <span className="h-px w-6 bg-[#FF8B53]" />
              <span>Universitas Tarumanagara</span>
            </div>

            <a
              href="#memories"
              className="group mt-10 inline-flex items-center gap-3 border-b border-white/45 pb-2 font-jakarta text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55D5E7] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] sm:text-xs"
            >
              View the photos
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-1 motion-reduce:transition-none" />
            </a>
          </div>

          <HeroPhotoSheet />
        </div>
      </div>
    </section>
  );
}

const HERO_PHOTOS = [
  { src: '/2026_pics/optimized/DSC07707.webp', alt: 'I/O Festival 2026 opening ceremony on stage', label: 'Opening ceremony' },
  { src: '/2026_pics/optimized/DSC07714.webp', alt: 'I/O Festival 2026 participants gathered on stage', label: 'On stage together' },
  { src: '/2026_pics/optimized/IMG_3977.webp', alt: 'I/O Festival 2026 audience during the event', label: 'In the room' },
  { src: '/2026_pics/optimized/IMG_4017.webp', alt: 'I/O Festival 2026 winners holding their awards', label: 'Winner moment' },
] as const;

function HeroPhotoSheet() {
  return (
    <div className="order-2 relative w-full lg:order-2">
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
        {HERO_PHOTOS.map((photo, index) => (
          <HeroPhotoCard
            key={photo.src}
            photo={photo}
            priority={index < 2}
            className="aspect-[4/3] w-full"
          />
        ))}
      </div>
    </div>
  );
}

function HeroPhotoCard({ photo, priority = false, className }: { photo: (typeof HERO_PHOTOS)[number]; priority?: boolean; className: string }) {
  return (
    <a
      href={photo.src}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={'Open ' + photo.alt + ' in a new tab'}
      className={'group relative min-h-0 overflow-hidden border border-white/15 bg-[#151515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55D5E7] ' + className}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 56vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 border-t border-white/15 bg-[#050505]/85 px-3 py-3 font-jakarta text-[9px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#050505]/95">
        <span>{photo.label}</span>
        <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-white/55" />
      </span>
    </a>
  );
}

function MemoryAtlasSection() {
  return (
    <section id="memories" aria-labelledby="memories-title" className="relative scroll-mt-20 border-b border-white/10 bg-[#050505] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 border-t border-white/15 pt-7 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] md:items-end md:gap-12 md:pt-9">
          <div>
            <h2 id="memories-title" className="max-w-[10ch] font-raela text-5xl font-black uppercase leading-[0.86] tracking-[-0.04em] sm:text-6xl md:text-8xl">
              The photographs.
            </h2>
          </div>
          <p className="max-w-md font-jakarta text-sm leading-relaxed text-white/46 md:justify-self-end md:text-[15px]">
            Photographs from 04—05 June 2026 at Universitas Tarumanagara.
          </p>
        </div>

        <div className="mt-12 overflow-hidden border-y border-white/15 md:mt-16">
          <Gallery />
        </div>
      </div>
    </section>
  );
}

function ArchiveFooter() {
  return (
    <footer id="contact" className="relative flex min-h-[100svh] scroll-mt-20 flex-col bg-[#F2F0E8] px-5 py-16 text-[#080808] md:px-10 md:py-24">
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        <div className="grid gap-10 border-b border-black/15 pb-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16 md:pb-20">
          <div>
            <h2 className="max-w-[9ch] font-raela text-[clamp(4rem,10.5vw,10.5rem)] font-black uppercase leading-[0.76] tracking-[-0.045em]">
              <span className="block">See you at</span>
              <span className="block">I/O Festival</span>
              <span className="block">2027.</span>
            </h2>
          </div>

          <Image
            src="/assets/logo/logo-io.webp"
            alt="I/O Festival"
            width={220}
            height={70}
            className="h-20 w-auto object-contain drop-shadow-[0_8px_18px_rgba(8,8,8,0.12)] md:h-28"
          />
        </div>

        <div className="grid gap-12 py-10 md:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] md:gap-20 md:py-14">
          <div>
            <p className="max-w-xl font-jakarta text-sm leading-relaxed text-black/58 md:text-[15px]">
              I/O Festival 2026 has closed. Thank you for building, judging, supporting, and showing up with us at Universitas Tarumanagara.
            </p>

            <div className="mt-8 flex items-center gap-6 md:mt-10 md:gap-7">
              <Image
                src="/assets/logo/LOGO FTI UNTAR.png"
                alt="FTI UNTAR"
                width={120}
                height={60}
                className="h-11 w-auto object-contain brightness-0 opacity-80 md:h-12"
              />
              <div className="h-9 w-px bg-black/20" />
              <Image
                src="/assets/logo/logo bem fti white.png"
                alt="BEM FTI UNTAR"
                width={120}
                height={60}
                className="h-11 w-auto object-contain brightness-0 opacity-80 md:h-12"
              />
            </div>
          </div>

          <div className="border-t border-black/15">
            <FooterLink href={ARCHIVE_COPY.instagramUrl} label="@iofest.untar" icon={<Instagram className="h-4 w-4" />} external />
            <FooterLink href="mailto:iobemftiuntar@gmail.com" label="iobemftiuntar@gmail.com" icon={<Mail className="h-4 w-4" />} />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-black/15 pt-5 font-jakarta text-[9px] font-semibold uppercase tracking-[0.16em] text-black/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 I/O Festival · BEM FTI UNTAR</p>
          <p>Technology into action</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center justify-between gap-5 border-b border-black/15 py-5 font-jakarta text-sm font-semibold transition-colors hover:text-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F0E8]"
    >
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
