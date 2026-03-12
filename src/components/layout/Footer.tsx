'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

// Lazy-load the map module
const LazyMap = dynamic(() => import('@/components/ui/map').then(mod => mod.Map), { ssr: false });
const LazyMapMarker = dynamic(() => import('@/components/ui/map').then(mod => mod.MapMarker), { ssr: false });
const LazyMarkerContent = dynamic(() => import('@/components/ui/map').then(mod => mod.MarkerContent), { ssr: false });
const LazyMarkerTooltip = dynamic(() => import('@/components/ui/map').then(mod => mod.MarkerTooltip), { ssr: false });
const LazyMarkerPopup = dynamic(() => import('@/components/ui/map').then(mod => mod.MarkerPopup), { ssr: false });
const LazyMapControls = dynamic(() => import('@/components/ui/map').then(mod => mod.MapControls), { ssr: false });

const quickLinks = [
  { name: 'Schedule', href: '/#timeline' },
  { name: 'FAQ', href: '/#faq' },
];

const competitionLinks = [
  { name: 'UI/UX Design', href: '/kompetisi/ui-ux' },
  { name: 'Web Development', href: '/kompetisi/web-dev' },
  { name: 'Business Case', href: '/kompetisi/business-case' },
];

export function Footer() {
  const regStatus = useRegistrationStatus();
  const [mapVisible, setMapVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="border-t border-white/10 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-cyan-900/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/assets/logo/logo-io.webp"
                alt="I/O Festival Logo"
                width={200}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Kompetisi teknologi nasional yang diselenggarakan oleh BEM FTI Universitas Tarumanagara sejak 2022.
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo/LOGO FTI UNTAR.png"
                alt="FTI UNTAR Logo"
                width={120}
                height={60}
                className="h-8 w-auto object-contain opacity-50"
              />
              <div className="w-px h-6 bg-white/10" />
              <Image
                src="/assets/logo/logo bem fti white.png"
                alt="BEM FTI Logo"
                width={120}
                height={60}
                className="h-8 w-auto object-contain opacity-50"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-[10px] font-raela font-black uppercase tracking-[0.2em] text-white/30 mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                {regStatus === 'open' ? (
                  <Link href="/kelengkapan" className="text-white/50 text-sm hover:text-white transition-colors">
                    Register
                  </Link>
                ) : (
                  <span className="text-white/20 text-sm cursor-not-allowed">
                    {regStatus === 'upcoming' ? 'Register (Coming Soon)' : 'Registration Closed'}
                  </span>
                )}
              </li>
            </ul>
          </div>

          {/* Competition */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-raela font-black uppercase tracking-[0.2em] text-white/30 mb-4">Competition</h3>
            <ul className="space-y-2.5">
              {competitionLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="md:col-span-3 md:col-start-10">
            <h3 className="text-[10px] font-raela font-black uppercase tracking-[0.2em] text-white/30 mb-4">Contact & Location</h3>
            <ul className="space-y-4 mb-6">
              <li>
                <a href="https://instagram.com/iofest.untar" target="_blank" rel="noopener noreferrer" aria-label="Follow I/O Festival on Instagram" className="flex items-start gap-2.5 text-white/50 text-sm hover:text-white transition-colors">
                  <Instagram className="w-4 h-4 shrink-0 mt-0.5" /> @iofest.untar
                </a>
              </li>
              <li>
                <a href="mailto:iobemftiuntar@gmail.com" aria-label="Send us an email" className="flex items-start gap-2.5 text-white/50 text-sm hover:text-white transition-colors">
                  <Mail className="w-4 h-4 shrink-0 mt-0.5" /> iobemftiuntar@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-neon-orange" />
                <span>Universitas Tarumanagara<br /><span className="text-[10px] opacity-60">Jl. Letjen S. Parman No.1, Jakarta Barat</span></span>
              </li>
            </ul>

            <div ref={mapRef} className="w-full h-32 border border-white/10 relative overflow-hidden grayscale contrast-[1.2] hover:grayscale-0 transition-all duration-700">
              <div className="absolute inset-0 bg-neon-blue/5 pointer-events-none z-10" />
              {mapVisible ? (
                <LazyMap center={[106.7888, -6.1678]} zoom={15} pitch={45}>
                  <LazyMapControls position="bottom-right" showZoom={false} />
                  <LazyMapMarker longitude={106.7888} latitude={-6.1678}>
                    <LazyMarkerContent>
                      <div className="size-4 rounded-full border border-white shadow-[0_0_10px_rgba(255,139,83,0.8)] bg-neon-orange relative">
                        <span className="animate-ping absolute inset-0 rounded-full bg-neon-orange opacity-40"></span>
                      </div>
                    </LazyMarkerContent>
                    <LazyMarkerTooltip className="bg-black/90 border border-white/10 text-white text-[10px] px-2 py-1 pointer-events-none rounded shadow-md z-50">
                      UNTAR
                    </LazyMarkerTooltip>
                    <LazyMarkerPopup className="bg-black/90 md:bg-black/80 border border-neon-orange/20 md:backdrop-blur-md p-3 w-48 rounded-lg shadow-xl text-left z-50">
                      <p className="font-raela font-bold text-white text-sm uppercase">UNTAR</p>
                      <p className="text-[9px] text-white/60 font-sans leading-relaxed">Kampus 1, Jakarta Barat</p>
                    </LazyMarkerPopup>
                  </LazyMapMarker>
                </LazyMap>
              ) : (
                <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white/20" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-jakarta">© 2026 I/O Festival · BEM FTI Universitas Tarumanagara</p>
          <p className="text-white/20 text-xs font-jakarta">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
