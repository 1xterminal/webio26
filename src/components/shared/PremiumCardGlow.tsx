'use client';

import { memo } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface PremiumCardGlowProps {
  accentHex: string;
  roundedClass?: string;
}

export const PremiumCardGlow = memo(({ accentHex, roundedClass = 'rounded-3xl' }: PremiumCardGlowProps) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div 
        className={`absolute inset-0 border border-white/5 ${roundedClass} pointer-events-none transition-colors duration-500`} 
      />
    );
  }

  return (
    <>
      {/* Layer 1: Ambient radial glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-[600ms] pointer-events-none ${roundedClass}`}
        style={{ background: `radial-gradient(circle at 100% 0%, ${accentHex} 0%, transparent 80%)` }}
      />
      {/* Layer 2: Flare */}
      <div
        className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-[800ms] pointer-events-none blur-[80px] mix-blend-screen"
        style={{ background: accentHex }}
      />
      {/* Layer 3: Gradient border via mask */}
      <div
        className={`absolute inset-0 ${roundedClass} pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-[600ms]`}
        style={{
          padding: '1px',
          background: `linear-gradient(135deg, ${accentHex}90 0%, rgba(255,255,255,0.05) 100%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Layer 4: Inner glow on hover */}
      <div
        className={`absolute inset-0 ${roundedClass} opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] pointer-events-none`}
        style={{ boxShadow: `inset 0 0 40px ${accentHex}15, 0 10px 40px 0 ${accentHex}25` }}
      />
    </>
  );
});

PremiumCardGlow.displayName = 'PremiumCardGlow';
