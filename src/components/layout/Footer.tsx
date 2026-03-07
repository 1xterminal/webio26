'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MessageCircle, Mail } from 'lucide-react';
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';

const quickLinks = [
  { name: 'Schedule', href: '/#timeline' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Resources', href: '/kelengkapan' },
];

const competitionLinks = [
  { name: 'UI/UX Design', href: '/kompetisi/ui-ux' },
  { name: 'Web Development', href: '/kompetisi/web-dev' },
  { name: 'Business Case', href: '/kompetisi/business-case' },
];

export function Footer() {
  const regStatus = useRegistrationStatus();

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
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4">Quick Links</h3>
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
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4">Competition</h3>
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

          {/* Contact */}
          <div className="md:col-span-3 md:col-start-10">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://instagram.com/iofest.untar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/50 text-sm hover:text-white transition-colors">
                  <Instagram className="w-4 h-4 shrink-0" /> @iofest.untar
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2.5 text-white/50 text-sm hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4 shrink-0" /> LINE Official
                </a>
              </li>
              <li>
                <a href="mailto:iobemftiuntar@gmail.com" className="flex items-center gap-2.5 text-white/50 text-sm hover:text-white transition-colors">
                  <Mail className="w-4 h-4 shrink-0" /> iobemftiuntar@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-mono">© 2026 I/O Festival · BEM FTI Universitas Tarumanagara</p>
          <p className="text-white/20 text-xs font-mono">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
