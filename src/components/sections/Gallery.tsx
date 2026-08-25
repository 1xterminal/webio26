'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const photoNames = [
  'DSC03366', 'DSC07707', 'DSC07712', 'DSC07714', 'DSC07715', 'DSC08055', 'DSC08259',
  'DSC08682', 'DSC08684', 'DSC08685', 'DSC08697', 'DSC08698', 'DSC08699',
  'DSC08700', 'DSC08702', 'DSC08716', 'DSC08725', 'DSC08726', 'DSC08727',
  'DSC08730', 'DSC08737', 'DSC08741', 'DSC08746', 'DSCF7348', 'DSCF7379',
  'DSCF7393', 'DSCF7401', 'DSCF7405', 'DSCF7407', 'DSCF7409', 'DSCF7410',
  'DSCF7412', 'DSCF7414', 'DSCF7423', 'DSCF7430', 'DSCF7435', 'DSCF7437',
  'DSCF7438', 'DSCF7439', 'IMG_3960', 'IMG_3977', 'IMG_3978', 'IMG_3986',
  'IMG_3991', 'IMG_3996', 'IMG_4017', 'IMG_8735', 'IMG_8742', 'IMG_8748',
  'IMG_8776', 'IMG_8784',
] as const;

const photos = photoNames.map((name, index) => ({
  src: `/2026_pics/optimized/${name}.webp`,
  alt: `I/O Festival 2026 event photograph ${index + 1}`,
}));

// Keep preview count aligned with six-tile layout cycle, avoiding a partial desktop row.
const INITIAL_VISIBLE_PHOTOS = 15;

const photoLayout = [
  'col-span-2 aspect-[16/10] md:col-span-6 md:aspect-[16/10]',
  'aspect-[4/5] md:col-span-3 md:aspect-[4/5]',
  'aspect-[4/5] md:col-span-3 md:aspect-[4/5]',
  'aspect-[4/3] md:col-span-4 md:aspect-[4/3]',
  'aspect-[4/3] md:col-span-4 md:aspect-[4/3]',
  'aspect-[4/3] md:col-span-4 md:aspect-[4/3]',
] as const;

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const visiblePhotos = showAll ? photos : photos.slice(0, INITIAL_VISIBLE_PHOTOS);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowLeft') setSelectedIndex((index) => (index === null ? 0 : (index - 1 + photos.length) % photos.length));
      if (event.key === 'ArrowRight') setSelectedIndex((index) => (index === null ? 0 : (index + 1) % photos.length));
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

  const selectedPhoto = selectedIndex === null ? null : photos[selectedIndex];

  return (
    <>
      <ul id="photo-grid" className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-12">
        {visiblePhotos.map((photo, index) => (
        <li key={photo.src} className={'relative overflow-hidden bg-[#111] ' + photoLayout[index % photoLayout.length]}>
          <button
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={'Open ' + photo.alt.toLowerCase()}
            className="group absolute inset-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#55D5E7]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
            />
          </button>
        </li>
        ))}
      </ul>

      {!showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          aria-controls="photo-grid"
          className="group flex w-full items-center justify-center gap-3 border-t border-white/15 bg-[#050505] px-5 py-6 font-jakarta text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#55D5E7]"
        >
          View all {photos.length} photographs
          <span aria-hidden="true" className="text-[#55D5E7] transition-transform duration-300 group-hover:translate-y-1 motion-reduce:transition-none">↓</span>
        </button>
      )}

      {selectedPhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center bg-[#050505]/[0.97] p-4 text-white sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedIndex(null);
          }}
        >
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
            <p className="font-jakarta text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
              {selectedIndex + 1} / {photos.length}
            </p>
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close photo viewer"
              className="flex h-10 w-10 items-center justify-center border border-white/25 font-jakarta text-xl leading-none text-white/80 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55D5E7]"
            >
              ×
            </button>
          </div>

          <div className="relative flex h-[min(82svh,900px)] w-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={() => setSelectedIndex((index) => (index === null ? 0 : (index - 1 + photos.length) % photos.length))}
            aria-label="Previous photograph"
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/25 font-jakarta text-2xl text-white/80 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55D5E7] sm:left-8"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setSelectedIndex((index) => (index === null ? 0 : (index + 1) % photos.length))}
            aria-label="Next photograph"
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/25 font-jakarta text-2xl text-white/80 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55D5E7] sm:right-8"
          >
            →
          </button>

          <p className="absolute inset-x-0 bottom-0 px-4 py-4 text-center font-jakarta text-[10px] uppercase tracking-[0.12em] text-white/55 sm:px-8 sm:py-6">
            {selectedPhoto.alt}
          </p>
        </div>
      )}
    </>
  );
}
