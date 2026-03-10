'use client';

import { memo } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import type { Tier, Benefit } from './ComparisonMatrix';

interface MobileAccordionProps {
  tiers: Tier[];
  benefits: Benefit[];
  openTier: number | null;
  onToggle: (idx: number) => void;
}

const BODY_MAX_H = '900px';

function renderCell(val: string | boolean, accentHex: string) {
  if (val === false || val === '-') {
    return <X className="w-4 h-4 text-white/20 mx-auto" />;
  }

  if (typeof val === 'boolean' && val === true) {
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center border mx-auto"
        style={{ borderColor: `${accentHex}50`, background: `${accentHex}15` }}
      >
        <Check className="w-3.5 h-3.5" style={{ color: accentHex }} />
      </div>
    );
  }
  return <span className="text-white font-raela font-bold text-sm leading-snug">{val}</span>;
}

export const MobileAccordion = memo(({ tiers, benefits, openTier, onToggle }: MobileAccordionProps) => {
  return (
    <div className="md:hidden flex flex-col gap-3">
      <p className="text-center text-[10px] font-mono text-white/25 uppercase tracking-[0.3em] mb-1">
        Tap a tier to explore benefits
      </p>
      {tiers.map((tier, idx) => (
        <div
          key={tier.name}
          className="group relative rounded-[20px] overflow-hidden bg-[rgba(16,16,16,0.85)]"
          style={{
            boxShadow: `0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 0 1px ${tier.accentHex}20`,
            contain: 'layout style paint',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none rounded-[20px]"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 100% 0%, ${tier.accentHex}12 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />

          <button
            onClick={() => onToggle(idx)}
            className="relative z-10 w-full flex items-center gap-4 px-5 py-5 text-left touch-manipulation"
            aria-expanded={openTier === idx}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div
              className="w-1 self-stretch rounded-full shrink-0"
              style={{ background: `linear-gradient(to bottom, ${tier.accentHex}, ${tier.accentHex}40)` }}
            />

            <div className="flex-1 min-w-0">
              <div
                className="h-px w-8 rounded-full mb-2"
                style={{ background: `linear-gradient(to right, ${tier.accentHex}, transparent)` }}
              />
              <h3 className="font-raela font-black text-xl text-white uppercase tracking-tighter leading-none">
                {tier.name}
              </h3>
              <span className="text-[10px] font-mono text-white/30 tracking-[0.35em] uppercase mt-1 block">
                Partner Tier
              </span>
            </div>

            <div
              className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
              style={{
                transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                transform: openTier === idx ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              aria-hidden="true"
            >
              <ChevronDown className="w-3.5 h-3.5 text-white/50" />
            </div>
          </button>

          <div
            style={{
              maxHeight: openTier === idx ? BODY_MAX_H : '0px',
              opacity: openTier === idx ? 1 : 0,
              overflow: 'hidden',
              transition: openTier === idx
                ? 'max-height 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms ease'
                : 'max-height 300ms cubic-bezier(0.7, 0, 0.84, 0), opacity 180ms ease',
            }}
          >
            <div className="px-5 pt-1 pb-5">
              <div
                className="h-px mb-3"
                style={{ background: `linear-gradient(to right, ${tier.accentHex}30, transparent)` }}
              />
              <div className="divide-y divide-white/[0.06]">
                {benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-center justify-between gap-3 py-3 min-h-[48px]">
                    <div className="flex-1 min-w-0">
                      <span className="text-[12px] leading-snug text-white/75 font-medium block">
                        {benefit.name}
                      </span>
                      {benefit.note && (
                        <span className="text-[9px] text-white/25 font-mono uppercase tracking-wider block mt-0.5">
                          {benefit.note}
                        </span>
                      )}
                    </div>
                    <div className="shrink-0 min-w-[64px] flex justify-end">
                      {renderCell(benefit.values[idx], tier.accentHex)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

MobileAccordion.displayName = 'MobileAccordion';
