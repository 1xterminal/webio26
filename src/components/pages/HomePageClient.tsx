'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ExternalLink, Instagram, Mail } from 'lucide-react';
import { Navbar, type NavItem } from '@/components/layout/Navbar';
import { ARCHIVE_COPY } from '@/lib/constants';

const Gallery = dynamic(() => import('@/components/sections/Gallery').then((mod) => mod.default), {
  ssr: false,
});

const coverImages = Array.from({ length: 17 }, (_, index) => `/covers/image_${index}.webp`);

const archiveNavItems: NavItem[] = [
  { name: 'Memories', href: '#memories', isHighlight: true },
  { name: 'Partners', href: '#partners', isHighlight: false, tone: 'default' },
  { name: 'Contact', href: '#contact', isHighlight: false, tone: 'default' },
];

const partnerGroups = [
  {
    title: 'Festival Partners',
    logos: [
      { name: 'V3 Production', src: '/assets/sponsors/DIAMOND/FESTIVAL PARTNER/v3 production.png' },
      { name: 'TokoTekno', src: '/assets/sponsors/DIAMOND/FESTIVAL PARTNER/TokoTekno_putih.png' },
      { name: 'Lamzu', src: '/assets/sponsors/DIAMOND/FESTIVAL PARTNER/lamzu_putih.png' },
      { name: 'Yunzi', src: '/assets/sponsors/DIAMOND/FESTIVAL PARTNER/yunzi_putih.png' },
    ],
  },
  {
    title: 'Diamond Partners',
    logos: [
      { name: 'BCA', src: '/assets/sponsors/DIAMOND/OFFICIAL CASE COLLABORATOR/bca.png' },
      { name: 'Archipelago', src: '/assets/sponsors/DIAMOND/OFFICIAL APPAREL/archipelago.png' },
    ],
  },
  {
    title: 'Platinum & Gold',
    logos: [
      { name: 'Seindonesia', src: '/assets/sponsors/PLATINUM/seindonesia.png' },
      { name: 'Digisnap', src: '/assets/sponsors/PLATINUM/digisnap.png' },
      { name: 'Rumah Nenek', src: '/assets/sponsors/GOLD/rumah nenek.png' },
    ],
  },
  {
    title: 'Community Supporters',
    logos: [
      { name: 'Alleyway Muse', src: '/assets/sponsors/SILVER/alleyway.png' },
      { name: 'JND Dimsum', src: '/assets/sponsors/SILVER/jnd.png' },
      { name: 'Anamcara', src: '/assets/sponsors/SILVER/anamcara.png' },
      { name: 'Cendol Duren', src: '/assets/sponsors/SILVER/cendol duren.png' },
      { name: 'Djadoel Cake', src: '/assets/sponsors/SILVER/djadoel cake.png' },
      { name: 'Nailboo', src: '/assets/sponsors/SILVER/nailboo.png' },
      { name: 'Suki Bento', src: '/assets/sponsors/SILVER/suki suki bento.png' },
      { name: 'Unomi', src: '/assets/sponsors/SILVER/unomi.png' },
      { name: 'Dooble G', src: '/assets/sponsors/SILVER/dooble g.png' },
      { name: 'Es Teh Makassar', src: '/assets/sponsors/SILVER/es teh makassar.png' },
      { name: 'Hoky Food', src: '/assets/sponsors/SILVER/hoky food.png' },
      { name: 'Jacks Hotdog', src: '/assets/sponsors/SILVER/jacks hotdog.png' },
      { name: 'Khong Thai Tea', src: '/assets/sponsors/SILVER/khong thai tea.png' },
    ],
  },
];

export default function HomePageClient() {
  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 12% 8%, rgba(255,139,83,0.16), transparent 28%), radial-gradient(circle at 86% 12%, rgba(85,213,231,0.14), transparent 32%), radial-gradient(circle at 52% 54%, rgba(182,100,251,0.08), transparent 42%), #0A0A0A',
        }}
      />
      <Navbar
        items={archiveNavItems}
        showRegistration={false}
        ariaLabel="Archive navigation"
        logoAriaLabel="I/O Festival 2026 archive home"
        logoSize="compact"
      />
      <div className="relative z-10">
        <ThankYouHero />
        <MemoryAtlasSection />
        <PartnersSection />
        <ArchiveFooter />
      </div>
    </main>
  );
}

function ThankYouHero() {
  const mosaicBackground = usePhotoMosaic(coverImages);
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [5, -5]), { stiffness: 120, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-7, 7]), { stiffness: 120, damping: 22 });
  const titleBackground =
    mosaicBackground || 'linear-gradient(90deg, #55D5E7 0%, #FFFFFF 38%, #FF8B53 100%)';

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    pointerX.set(x);
    pointerY.set(y);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-28"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#55D5E7] to-transparent opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0A0A0A]/35" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[50%] -z-10 h-[55vh] min-h-[390px] w-[min(1200px,96vw)] -translate-x-1/2 -translate-y-1/2 blur-[6px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.44) 16%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.44) 84%, transparent 100%)',
          clipPath: 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[50%] -z-10 h-[42vh] min-h-[340px] w-[min(1020px,86vw)] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[2px]"
        animate={prefersReducedMotion ? undefined : { opacity: [0.14, 0.24, 0.14] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage: titleBackground,
          backgroundSize: 'cover',
          backgroundPosition: 'center 52%',
          clipPath: 'polygon(0 18%, 100% 0, 100% 82%, 0 100%)',
          maskImage: 'linear-gradient(90deg, transparent, black 24%, black 76%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 24%, black 76%, transparent)',
          filter: 'brightness(0.74) saturate(0.9)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[50%] -z-10 h-[48vh] min-h-[380px] w-[min(1140px,92vw)] -translate-x-1/2 -translate-y-1/2 border-y border-white/10"
        style={{
          clipPath: 'polygon(0 12%, 100% 0, 100% 88%, 0 100%)',
          background:
            'linear-gradient(90deg, transparent, rgba(85,213,231,0.06) 22%, rgba(255,255,255,0.025) 50%, rgba(255,139,83,0.06) 78%, transparent)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <p className="font-raela mb-6 text-3xl font-black uppercase leading-none tracking-[0.12em] text-white/84 drop-shadow-[0_10px_28px_rgba(255,255,255,0.12)] sm:text-4xl md:mb-7 md:text-5xl lg:text-6xl">
            Thank You
          </p>
          <motion.h1
            aria-label="I/O Festival 2026"
            className="font-raela relative mx-auto max-w-[min(100%,13ch)] text-[3.7rem] font-black uppercase leading-[0.78] tracking-normal sm:text-[6.2rem] md:text-[8.3rem] lg:text-[10.6rem] xl:text-[12.3rem]"
            style={{
              rotateX: prefersReducedMotion ? 0 : rotateX,
              rotateY: prefersReducedMotion ? 0 : rotateY,
              transformPerspective: 900,
              transformStyle: 'preserve-3d',
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 block text-transparent opacity-95 blur-[0.5px]"
              style={{
                WebkitTextStroke: '6px rgba(0,0,0,0.48)',
                transform: 'translate3d(0, 0.02em, -68px)',
              }}
            >
              <span className="block">I/O Festival</span>
              <span className="block">2026</span>
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 block text-transparent opacity-82 blur-[1px]"
              style={{
                WebkitTextStroke: '1.5px rgba(85,213,231,0.42)',
                transform: 'translate3d(-0.035em, -0.035em, -48px)',
              }}
            >
              <span className="block">I/O Festival</span>
              <span className="block">2026</span>
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 block text-transparent opacity-82"
              style={{
                WebkitTextStroke: '1.5px rgba(255,139,83,0.4)',
                transform: 'translate3d(0.045em, 0.05em, -32px)',
              }}
            >
              <span className="block">I/O Festival</span>
              <span className="block">2026</span>
            </span>
            <span
              aria-hidden="true"
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: titleBackground,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitTextFillColor: 'transparent',
                filter:
                  'brightness(1.16) saturate(1.42) contrast(1.2) drop-shadow(0 0 14px rgba(255,255,255,0.12)) drop-shadow(0 18px 28px rgba(85,213,231,0.2)) drop-shadow(0 38px 84px rgba(0,0,0,0.72))',
                transform: 'translateZ(52px)',
              }}
            >
              I/O Festival
            </span>
            <span
              aria-hidden="true"
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: titleBackground,
                backgroundSize: 'cover',
                backgroundPosition: 'center 68%',
                WebkitTextFillColor: 'transparent',
                filter:
                  'brightness(1.16) saturate(1.42) contrast(1.2) drop-shadow(0 0 14px rgba(255,255,255,0.12)) drop-shadow(0 18px 28px rgba(255,139,83,0.2)) drop-shadow(0 38px 84px rgba(0,0,0,0.72))',
                transform: 'translateZ(52px)',
              }}
            >
              2026
            </span>
          </motion.h1>
          <p className="mx-auto mt-9 max-w-2xl font-jakarta text-lg font-light leading-relaxed text-white/92 drop-shadow-[0_12px_30px_rgba(0,0,0,0.72)] md:mt-10 md:text-2xl">
            {ARCHIVE_COPY.futureLine}
          </p>

          <div className="mt-12 flex flex-col justify-center gap-2.5 sm:flex-row">
            <a
              href="#memories"
              className="group inline-flex items-center justify-center gap-3 bg-white px-5 py-4 font-raela text-sm font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#55D5E7]"
            >
              {ARCHIVE_COPY.memoryCta}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href={ARCHIVE_COPY.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 border border-white/30 px-5 py-4 font-raela text-sm font-black uppercase tracking-[0.18em] text-white/88 transition-colors hover:border-[#FF8B53]/85 hover:text-white"
            >
              {ARCHIVE_COPY.instagramCta}
              <ExternalLink className="h-4 w-4 text-[#55D5E7]/85 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF8B53]" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function usePhotoMosaic(imagePaths: string[]) {
  const [mosaic, setMosaic] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement | null>((resolve) => {
        const image = new window.Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = src;
      });

    const drawCover = (
      context: CanvasRenderingContext2D,
      image: HTMLImageElement,
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      const sourceRatio = image.naturalWidth / image.naturalHeight;
      const targetRatio = width / height;
      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;
      let sourceX = 0;
      let sourceY = 0;

      if (sourceRatio > targetRatio) {
        sourceWidth = image.naturalHeight * targetRatio;
        sourceX = (image.naturalWidth - sourceWidth) / 2;
      } else {
        sourceHeight = image.naturalWidth / targetRatio;
        sourceY = (image.naturalHeight - sourceHeight) / 2;
      }

      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
    };

    async function createMosaic() {
      const images = (await Promise.all(imagePaths.map(loadImage))).filter(Boolean) as HTMLImageElement[];
      if (cancelled || images.length === 0) return;

      const canvas = document.createElement('canvas');
      canvas.width = 1800;
      canvas.height = 900;
      const context = canvas.getContext('2d');
      if (!context) return;

      context.fillStyle = '#0A0A0A';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.filter = 'brightness(1.08) saturate(1.32) contrast(1.18)';

      const tileWidth = 180;
      const tileHeight = 130;
      let imageIndex = 0;

      for (let y = -tileHeight; y < canvas.height + tileHeight; y += tileHeight) {
        for (let x = -tileWidth; x < canvas.width + tileWidth; x += tileWidth) {
          const image = images[imageIndex % images.length];
          const offsetX = ((imageIndex * 37) % 76) - 38;
          const offsetY = ((imageIndex * 29) % 52) - 26;
          drawCover(context, image, x + offsetX, y + offsetY, tileWidth + 32, tileHeight + 28);
          imageIndex += 1;
        }
      }

      context.filter = 'none';
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(85,213,231,0.58)');
      gradient.addColorStop(0.42, 'rgba(255,255,255,0.16)');
      gradient.addColorStop(1, 'rgba(255,139,83,0.58)');
      context.globalCompositeOperation = 'source-atop';
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.globalCompositeOperation = 'source-over';
      context.fillStyle = 'rgba(10,10,10,0.04)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      if (!cancelled) setMosaic(`url(${canvas.toDataURL('image/webp', 0.86)})`);
    }

    createMosaic();

    return () => {
      cancelled = true;
    };
  }, [imagePaths]);

  return mosaic;
}

function MemoryAtlasSection() {
  return (
    <div id="memories" className="relative scroll-mt-20 px-4 py-16 md:px-8 md:py-24">
      <Gallery />
    </div>
  );
}

function PartnersSection() {
  return (
    <section id="partners" className="relative scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="border-y border-white/10 py-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <h2 className="font-raela text-5xl font-black uppercase leading-[0.92] tracking-normal md:text-8xl lg:col-span-7">
              With
              <span className="block text-[#55D5E7]">Gratitude</span>
            </h2>
            <p className="font-jakarta text-base leading-relaxed text-white/60 md:text-lg lg:col-span-5">
              Thank you to every partner and supporter who stood with I/O Festival 2026 from preparation
              to awarding day.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          {partnerGroups.map((group) => (
            <div key={group.title} className="border border-white/10 bg-white/[0.018] p-4 md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-[#FF8B53] via-[#B664FB] to-[#55D5E7]" />
                <h3 className="font-raela text-xs font-black uppercase tracking-[0.28em] text-white/50">
                  {group.title}
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-[#55D5E7] via-[#B664FB] to-[#FF8B53]" />
              </div>
              <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.logos.map((logo) => (
                  <div
                    key={logo.name}
                    className="flex h-24 items-center justify-center border border-white/10 bg-[#0A0A0A] p-4 transition-colors hover:border-white/20"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={220}
                      height={120}
                      className="max-h-14 w-auto object-contain opacity-75 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveFooter() {
  return (
    <footer id="contact" className="relative scroll-mt-24 border-t border-white/10 px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Image
            src="/assets/logo/logo-io.webp"
            alt="I/O Festival 2026"
            width={220}
            height={70}
            className="h-12 w-auto object-contain"
          />
          <p className="mt-5 max-w-xl font-jakarta text-sm leading-relaxed text-white/45">
            I/O Festival 2026 has closed. Thank you for building, judging, supporting, and showing up
            with us at Universitas Tarumanagara.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/assets/logo/LOGO FTI UNTAR.png"
              alt="FTI UNTAR"
              width={120}
              height={60}
              className="h-8 w-auto object-contain opacity-45"
            />
            <div className="h-7 w-px bg-white/10" />
            <Image
              src="/assets/logo/logo bem fti white.png"
              alt="BEM FTI UNTAR"
              width={120}
              height={60}
              className="h-8 w-auto object-contain opacity-45"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <a
            href={ARCHIVE_COPY.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-jakarta text-sm font-semibold text-white/65 transition-colors hover:text-white"
          >
            <Instagram className="h-4 w-4 text-[#FF8B53]" />
            @iofest.untar
          </a>
          <a
            href="mailto:iobemftiuntar@gmail.com"
            className="inline-flex items-center gap-3 font-jakarta text-sm font-semibold text-white/65 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 text-[#55D5E7]" />
            iobemftiuntar@gmail.com
          </a>
          <p className="pt-5 font-jakarta text-xs text-white/25">© 2026 I/O Festival · BEM FTI UNTAR</p>
        </div>
      </div>
    </footer>
  );
}
