'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Handshake,
  Briefcase,
} from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { competitions } from '@/lib/competitions';
import { useRegistrationStatus } from '@/hooks/useRegistrationStatus';

// ─── Static data outside component for zero re-allocation cost ─────────────
// (react-best-practices: hoist static JSX/data; clean-code: meaningful names)

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: string;
  /** Primary CTA items shown with full brightness & shimmer underline */
  isHighlight: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: 'Competition',
    href: '/#tracks',
    hasDropdown: true,
    dropdownType: 'competition',
    isHighlight: true,
  },
  { name: 'Schedule',   href: '/#timeline',   isHighlight: false },
  {
    name: 'Partnership',
    href: '/sponsorship',
    hasDropdown: true,
    dropdownType: 'partnership',
    isHighlight: false,
  },
  { name: 'FAQ',                href: '/#faq',    isHighlight: false },
  { name: 'Impact Projection',  href: '/impact',  isHighlight: true  },
];

interface PartnershipLink {
  slug: string;
  title: string;
  tagline: string;
  href: string;
  icon: React.ElementType<{ className?: string; style?: React.CSSProperties }>;
  accentHex: string;
}

const PARTNERSHIP_LINKS: PartnershipLink[] = [
  {
    slug: 'sponsorship',
    title: 'Sponsorship',
    tagline: 'Brand exposure & on-ground activation.',
    href: '/sponsorship',
    icon: Handshake,
    accentHex: '#A856EE',
  },
  {
    slug: 'casecollab',
    title: 'Case Collaborator',
    tagline: 'Transform challenges into opportunities.',
    href: '/casecollab',
    icon: Briefcase,
    accentHex: '#1DBCD3',
  },
];

// ─── Framer variants — defined once, not recreated per render ─────────────
const DROPDOWN_VARIANTS = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
};

const MOBILE_MENU_VARIANTS = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const SUB_MENU_VARIANTS = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

// ─── Main component ──────────────────────────────────────────────────────────
export function Navbar() {
  const [isOpen, setIsOpen]                   = useState(false);
  const [isScrolled, setIsScrolled]           = useState(false);
  const [activeDropdown, setActiveDropdown]   = useState<string | null>(null);
  const [mobileCompOpen, setMobileCompOpen]   = useState(false);
  const [mobilePartOpen, setMobilePartOpen]   = useState(false);

  const regStatus       = useRegistrationStatus();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const transitionClass = isScrolled
    ? 'transition-all duration-700 ease-[0.16,1,0.3,1]'
    : 'transition-all duration-300 ease-[0.7,0,0.84,0]';

  const { scrollY } = useScroll();

  // Scroll handler — sets state only on threshold cross (avoids thrash)
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  // ── useCallback: stable refs, no new function per render ─────────────────
  const handleMouseEnter = useCallback((type: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(type);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 300);
  }, []);

  const closeDropdown  = useCallback(() => setActiveDropdown(null), []);
  const toggleMenu     = useCallback(() => setIsOpen((v) => !v), []);
  const closeMenu      = useCallback(() => setIsOpen(false), []);
  const toggleMobileComp = useCallback(() => setMobileCompOpen((v) => !v), []);
  const toggleMobilePart = useCallback(() => setMobilePartOpen((v) => !v), []);

  return (
    <>
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-[60] flex justify-center pointer-events-none ${transitionClass} ${
          isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'
        }`}
      >
        <div
          className={`flex items-center justify-between pointer-events-auto w-full gap-6 md:backdrop-blur-md ${transitionClass} ${
            isScrolled
              ? 'rounded-2xl px-6 py-3 bg-black/80 md:bg-black/30 max-w-5xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'rounded-none px-10 py-5 bg-black/40 max-w-full border-b border-white/5'
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="I/O Festival Home"
            className="flex items-center gap-2 font-raela font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity"
          >
            <Image
              id="navbar-logo"
              src="/assets/logo/logo-io.webp"
              alt="I/O Festival Logo"
              width={200}
              height={60}
              className={`w-auto object-contain transform-gpu will-change-[height] ${transitionClass} ${
                isScrolled ? 'h-8 md:h-10' : 'h-10 md:h-14'
              }`}
              priority
            />
          </Link>

          {/* ── Desktop Nav Items ───────────────────────────────────────── */}
          <div
            className={`hidden md:flex items-center ${transitionClass} ${
              isScrolled ? 'gap-5 xl:gap-7' : 'gap-6 xl:gap-9'
            }`}
          >
            {NAV_ITEMS.map((item) =>
              item.hasDropdown ? (
                <DropdownTrigger
                  key={item.name}
                  item={item}
                  isScrolled={isScrolled}
                  isActive={activeDropdown === item.dropdownType}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ) : (
                <NavLink
                  key={item.name}
                  item={item}
                  isScrolled={isScrolled}
                  onClick={closeDropdown}
                />
              )
            )}
          </div>

          {/* ── CTA / Hamburger ─────────────────────────────────────────── */}
          <div className="flex items-center gap-4">
            <RegisterButton
              regStatus={regStatus}
              isScrolled={isScrolled}
              transitionClass={transitionClass}
            />
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:text-neon-orange transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mega Dropdown ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            variants={DROPDOWN_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-0 w-full z-[61] pointer-events-auto"
            onMouseEnter={() => handleMouseEnter(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="mx-auto max-w-5xl px-6">
              <div className="bg-[#0a0a0a] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)] md:backdrop-blur-2xl">
                <div className="grid grid-cols-12 min-h-[280px]">

                  {/* Featured panel */}
                  <div className="col-span-4 p-8 border-r border-white/5 flex flex-col justify-between bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-orange/5">
                    <div>
                      {activeDropdown === 'competition' && (
                        <span className="text-neon-blue font-mono uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 block">
                          I/O Festival 2026
                        </span>
                      )}
                      <span className="block font-raela font-bold text-2xl text-white leading-tight mb-3">
                        {activeDropdown === 'competition'
                          ? '3 Cabang Kompetisi Nasional'
                          : 'Strategic Partnership'}
                      </span>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {activeDropdown === 'competition'
                          ? 'Terbuka untuk mahasiswa, siswa, dan umum. Pilih cabang yang sesuai dan buktikan skill kamu.'
                          : 'Pilih tipe kemitraan yang paling sesuai dengan profil dan tujuan strategis perusahaan Anda.'}
                      </p>
                    </div>
                    {activeDropdown === 'competition' && (
                      regStatus === 'open' ? (
                        <Link
                          href="#"
                          onClick={closeDropdown}
                          className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors mt-6 group"
                        >
                          Register now{' '}
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-white/30 mt-6 cursor-not-allowed">
                          {regStatus === 'upcoming'
                            ? 'Registration opens 15 March'
                            : 'Registration closed'}
                        </span>
                      )
                    )}
                  </div>

                  {/* Links panel */}
                  <div className="col-span-8 p-2">
                    <div className="grid grid-cols-1 h-full">
                      {(activeDropdown === 'competition'
                        ? competitions
                        : PARTNERSHIP_LINKS
                      ).map((item) => {
                        const isComp   = activeDropdown === 'competition';
                        const compItem = isComp
                          ? (item as import('@/lib/competitions').CompetitionData)
                          : null;
                        const partItem = !isComp ? (item as PartnershipLink) : null;
                        const CompIcon = compItem?.icon as
                          | React.ElementType<{ className?: string; style?: React.CSSProperties }>
                          | undefined;
                        const PartIcon = partItem?.icon;

                        return (
                          <Link
                            key={isComp ? compItem!.slug : partItem!.slug}
                            href={isComp ? `/kompetisi/${compItem!.slug}` : partItem!.href}
                            prefetch
                            onClick={closeDropdown}
                            className="flex items-center gap-5 px-6 py-5 hover:bg-white/[0.03] transition-colors group/item rounded-sm"
                          >
                            <div className="w-14 h-14 shrink-0 group-hover/item:scale-110 transition-transform duration-300 flex items-center justify-center transform-gpu">
                              {isComp && CompIcon ? (
                                <CompIcon className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
                              ) : !isComp && PartIcon && partItem ? (
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-white/20 transition-colors">
                                  <PartIcon
                                    className="w-6 h-6 text-white"
                                    style={{
                                      filter: `drop-shadow(0 0 8px ${partItem.accentHex})`,
                                    }}
                                  />
                                </div>
                              ) : null}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-[15px]">
                                  {isComp ? compItem!.title : partItem!.title}
                                </span>
                                {isComp && compItem!.badge && (
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-neon-orange/20 text-neon-orange">
                                    {compItem!.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-white/30 text-xs mt-0.5 block line-clamp-2 md:line-clamp-1">
                                {isComp ? compItem!.tagline : partItem!.tagline}
                              </span>
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

      {/* ── Mobile Menu ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            variants={MOBILE_MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[55] bg-black/95 md:backdrop-blur-md flex flex-col items-center justify-center space-y-6 md:hidden"
          >
            {NAV_ITEMS.map((item) =>
              item.hasDropdown ? (
                <MobileDropdownItem
                  key={item.name}
                  item={item}
                  isOpen={
                    item.dropdownType === 'competition'
                      ? mobileCompOpen
                      : mobilePartOpen
                  }
                  onToggle={
                    item.dropdownType === 'competition'
                      ? toggleMobileComp
                      : toggleMobilePart
                  }
                  subItems={
                    item.dropdownType === 'competition'
                      ? competitions
                      : PARTNERSHIP_LINKS
                  }
                  onClose={closeMenu}
                />
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-3xl font-raela font-bold transition-colors ${
                    item.isHighlight
                      ? 'text-white hover:text-neon-orange'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}

            {/* Mobile CTA */}
            {regStatus === 'open' ? (
              <Link
                href="#"
                onClick={closeMenu}
                className="mt-8 bg-neon-orange text-white px-8 py-3 rounded-full font-bold text-lg tracking-wider shadow-[0_0_20px_rgba(255,139,83,0.4)]"
              >
                Register
              </Link>
            ) : (
              <span
                className={`mt-8 px-8 py-3 rounded-full font-bold text-lg tracking-wider cursor-not-allowed ${
                  regStatus === 'upcoming'
                    ? 'bg-white/20 text-white/50'
                    : 'bg-white/10 text-white/30'
                }`}
              >
                {regStatus === 'upcoming' ? 'Coming Soon' : 'Closed'}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Sub-components — isolated for minimal re-render surface ─────────────────
// (react-best-practices: extract expensive/stable UI into sub-components)

interface DropdownTriggerProps {
  item: NavItem;
  isScrolled: boolean;
  isActive: boolean;
  onMouseEnter: (type: string) => void;
  onMouseLeave: () => void;
}

function DropdownTrigger({
  item,
  isScrolled,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: DropdownTriggerProps) {
  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => onMouseEnter(item.dropdownType!)}
      onMouseLeave={onMouseLeave}
    >
      <button
        aria-expanded={isActive}
        aria-haspopup="true"
        className={`font-raela font-bold transition-all duration-300 relative flex items-center gap-1 rounded-full ${
          isScrolled ? 'text-sm' : 'text-base'
        } ${
          isActive
            ? item.isHighlight
              ? 'text-white bg-neon-orange/15 px-3.5 py-1.5 -mx-3.5 -my-1.5 shadow-[0_0_14px_rgba(255,139,83,0.25)]'
              : 'text-white bg-white/10 px-3.5 py-1.5 -mx-3.5 -my-1.5'
            : item.isHighlight
              ? 'text-white hover:text-neon-orange'
              : 'text-white/45 hover:text-white/80'
        }`}
      >
        <span className={item.isHighlight ? 'tracking-wide' : undefined}>
          {item.name}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isActive ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Shimmer gradient underline for highlight items */}
      {item.isHighlight && !isActive && <ShimmerUnderline />}

      {/* Invisible hover bridge to mega menu */}
      {isActive && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 h-[60px] bg-transparent z-50 pointer-events-auto" />
      )}
    </div>
  );
}

interface NavLinkProps {
  item: NavItem;
  isScrolled: boolean;
  onClick?: () => void;
}

function NavLink({ item, isScrolled, onClick }: NavLinkProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`font-raela font-bold transition-all duration-300 relative group ${
        isScrolled ? 'text-sm' : 'text-base'
      } ${
        item.isHighlight
          ? 'text-white hover:text-neon-orange'
          : 'text-white/45 hover:text-white/80'
      }`}
    >
      <span className={item.isHighlight ? 'tracking-wide' : undefined}>
        {item.name}
      </span>

      {item.isHighlight ? (
        <ShimmerUnderline />
      ) : (
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-300" />
      )}
    </Link>
  );
}


/**
 * Orange→purple gradient underline with a shimmer pass.
 * Uses a clipped overflow wrapper so the shimmer bar never
 * causes reflow — only transforms are animated.
 */
function ShimmerUnderline() {
  return (
    <span
      aria-hidden="true"
      className="nav-glow-line absolute -bottom-0.5 left-0 w-full h-px overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #ff8b53 0%, #b664fb 100%)',
        animation: 'nav-glow-breathe 3s ease-in-out infinite',
        willChange: 'opacity',
      }}
    >
      {/* Shimmer bar — translateX only, zero paint cost */}
      <span
        className="nav-shimmer-bar absolute inset-y-0 w-1/2 bg-white/60"
        style={{
          animation: 'nav-shimmer 2.8s linear infinite',
          willChange: 'transform',
        }}
      />
    </span>
  );
}

// ── Mobile Dropdown ──────────────────────────────────────────────────────────

interface MobileDropdownItemProps {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  subItems: typeof competitions | PartnershipLink[];
  onClose: () => void;
}

function MobileDropdownItem({
  item,
  isOpen,
  onToggle,
  subItems,
  onClose,
}: MobileDropdownItemProps) {
  const isComp = item.dropdownType === 'competition';

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`text-3xl font-raela font-bold transition-colors flex items-center gap-2 ${
          item.isHighlight
            ? 'text-white hover:text-neon-orange'
            : 'text-white/50 hover:text-white'
        }`}
      >
        {item.name}
        <ChevronDown
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={SUB_MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-3"
          >
            {subItems.map((subItem) => {
              const href = isComp
                ? `/kompetisi/${subItem.slug}`
                : (subItem as PartnershipLink).href;
              return (
                <Link
                  key={subItem.slug}
                  href={href}
                  prefetch
                  onClick={onClose}
                  className="block text-center text-lg text-white/60 hover:text-neon-orange transition-colors"
                >
                  {subItem.title}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Register Button ──────────────────────────────────────────────────────────

interface RegisterButtonProps {
  regStatus: 'open' | 'upcoming' | 'closed';
  isScrolled: boolean;
  transitionClass: string;
}

function RegisterButton({ regStatus, isScrolled, transitionClass }: RegisterButtonProps) {
  const sizeClass = isScrolled
    ? 'px-5 py-2 text-sm'
    : 'px-6 py-2.5 text-base';

  if (regStatus === 'open') {
    return (
      <Link
        href="#"
        className={`hidden md:block bg-white text-black rounded-full font-raela font-black tracking-tight hover:bg-neon-orange hover:text-white hover:shadow-[0_0_20px_rgba(255,139,83,0.4)] ${transitionClass} transform hover:-translate-y-0.5 ${sizeClass}`}
      >
        Register
      </Link>
    );
  }

  return (
    <span
      className={`hidden md:block rounded-full font-raela font-black tracking-tight cursor-not-allowed ${transitionClass} ${sizeClass} ${
        regStatus === 'upcoming'
          ? 'bg-white/20 text-white/50'
          : 'bg-white/10 text-white/30'
      }`}
    >
      {regStatus === 'upcoming' ? 'Coming Soon' : 'Closed'}
    </span>
  );
}
