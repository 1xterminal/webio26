'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { competitions } from '@/lib/competitions';
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';

const navItems = [
  { name: 'Competition', href: '/#tracks', hasDropdown: true },
  { name: 'Schedule', href: '/#timeline' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Resources', href: '/kelengkapan' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileCompOpen, setMobileCompOpen] = useState(false);
  const regStatus = useRegistrationStatus();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The exact mathematical reverse of cubic-bezier(0.16, 1, 0.3, 1) is cubic-bezier(0.7, 0, 0.84, 0)
  const transitionClass = isScrolled
    ? 'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
    : 'transition-all duration-300 ease-[cubic-bezier(0.7,0,0.84,0)]';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-[60] flex justify-center pointer-events-none ${transitionClass} ${isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'
          }`}
      >
        <div className={`flex items-center justify-between pointer-events-auto w-full gap-8 backdrop-blur-md ${transitionClass} ${isScrolled
          ? 'rounded-2xl px-6 py-3 bg-black/30 max-w-4xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'rounded-none px-12 py-5 bg-black/40 max-w-500 border-b border-white/5'
          }`}>
          <Link href="/" aria-label="I/O Festival Home" className="flex items-center gap-2 font-raela font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
            <Image
              id="navbar-logo"
              src="/assets/logo/logo-io.webp"
              alt="I/O Festival Logo"
              width={200}
              height={60}
              className={`w-auto object-contain ${transitionClass} ${isScrolled ? 'h-10' : 'h-14'}`}
              priority
            />
          </Link>

          <div className={`hidden md:flex items-center ${transitionClass} ${isScrolled ? 'gap-8' : 'gap-10'}`}>
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`font-medium transition-all duration-300 relative group flex items-center gap-1 rounded-full ${isScrolled ? 'text-sm' : 'text-base'} ${showDropdown ? 'text-white bg-white/10 px-3.5 py-1.5 -mx-3.5 -my-1.5' : 'text-white/70 hover:text-white'}`}
                  >
                    {item.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium text-white/70 hover:text-white transition-all duration-300 relative group ${isScrolled ? 'text-sm' : 'text-base'}`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-blue group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-4">
            {regStatus === 'open' ? (
              <Link href="/kelengkapan" className={`hidden md:block bg-white text-black rounded-full font-bold tracking-tight hover:bg-neon-orange hover:text-white hover:shadow-[0_0_20px_rgba(255,139,83,0.4)] ${transitionClass} transform hover:-translate-y-0.5 ${isScrolled ? 'px-5 py-2 text-sm' : 'px-6 py-2.5 text-base'}`}>
                Register
              </Link>
            ) : (
              <span className={`hidden md:block rounded-full font-bold tracking-tight cursor-not-allowed ${transitionClass} ${isScrolled ? 'px-5 py-2 text-sm' : 'px-6 py-2.5 text-base'} ${regStatus === 'upcoming' ? 'bg-white/20 text-white/50' : 'bg-white/10 text-white/30'}`}>
                {regStatus === 'upcoming' ? 'Coming Soon' : 'Closed'}
              </span>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:text-neon-orange transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mega dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-0 w-full z-61 pointer-events-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="mx-auto max-w-5xl px-6">
              <div className="bg-[#0a0a0a] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-md md:backdrop-blur-2xl">
                <div className="grid grid-cols-12 min-h-[280px]">

                  {/* Featured */}
                  <div className="col-span-4 p-8 border-r border-white/5 flex flex-col justify-between bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-orange/5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4 block">I/O Festival 2026</span>
                      <span className="block font-raela font-bold text-2xl text-white leading-tight mb-3">
                        3 Cabang Kompetisi Nasional
                      </span>
                      <p className="text-white/40 text-sm leading-relaxed">
                        Terbuka untuk mahasiswa, siswa, dan umum.
                        Pilih cabang yang sesuai dan buktikan skill kamu.
                      </p>
                    </div>
                    {regStatus === 'open' ? (
                      <Link
                        href="/kelengkapan"
                        onClick={() => setShowDropdown(false)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors mt-6 group"
                      >
                        Register now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-white/30 mt-6 cursor-not-allowed">
                        {regStatus === 'upcoming' ? 'Registration opens 15 March' : 'Registration closed'}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="col-span-8 p-2">
                    <div className="grid grid-cols-1 h-full">
                      {competitions.map((comp) => {
                        const CompIcon = comp.icon;
                        return (
                          <Link
                            key={comp.slug}
                            href={`/kompetisi/${comp.slug}`}
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-5 px-6 py-5 hover:bg-white/[0.03] transition-colors group/item rounded-sm"
                          >
                            <div className="w-14 h-14 shrink-0 group-hover/item:scale-110 transition-transform duration-300 flex items-center justify-center">
                              <CompIcon className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-[15px]">{comp.title}</span>
                                {comp.badge && (
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-neon-orange/20 text-neon-orange">
                                    {comp.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-white/30 text-xs mt-0.5 block">{comp.tagline}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/0 group-hover/item:text-white/40 transition-all shrink-0 -translate-x-2 group-hover/item:translate-x-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center space-y-6 md:hidden"
          >
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.name} className="flex flex-col items-center">
                  <button
                    onClick={() => setMobileCompOpen(!mobileCompOpen)}
                    className="text-3xl font-raela font-bold text-white hover:text-neon-orange transition-colors flex items-center gap-2"
                  >
                    {item.name}
                    <ChevronDown className={`w-6 h-6 transition-transform ${mobileCompOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileCompOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4 space-y-3"
                      >
                        {competitions.map((comp) => (
                          <Link
                            key={comp.slug}
                            href={`/kompetisi/${comp.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block text-center text-lg text-white/60 hover:text-neon-orange transition-colors"
                          >
                            {comp.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-raela font-bold text-white hover:text-neon-orange transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
            {regStatus === 'open' ? (
              <Link href="/kelengkapan" onClick={() => setIsOpen(false)} className="mt-8 bg-neon-orange text-white px-8 py-3 rounded-full font-bold text-lg tracking-wider shadow-[0_0_20px_rgba(255,139,83,0.4)]">
                Register
              </Link>
            ) : (
              <span className={`mt-8 px-8 py-3 rounded-full font-bold text-lg tracking-wider cursor-not-allowed ${regStatus === 'upcoming' ? 'bg-white/20 text-white/50' : 'bg-white/10 text-white/30'}`}>
                {regStatus === 'upcoming' ? 'Coming Soon' : 'Closed'}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
