'use client';

import { memo } from 'react';
import { X, Check } from 'lucide-react';

export interface Tier {
  name: string;
  color: string;
  accentHex: string;
}

export interface Benefit {
  name: string;
  note?: string;
  values: (string | boolean)[];
}

interface ComparisonMatrixProps {
  tiers: Tier[];
  benefits: Benefit[];
  hoveredTier: number | null;
  onHoverTier: (idx: number | null) => void;
}

function renderCell(val: string | boolean, accentHex: string) {
  if (val === false || val === '-') {
    return <X className="w-4 h-4 text-white/20 mx-auto" />;
  }

  if (typeof val === 'boolean' && val === true) {
    return (
      <div
        className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border mx-auto"
        style={{ borderColor: `${accentHex}50`, background: `${accentHex}15` }}
      >
        <Check className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: accentHex }} />
      </div>
    );
  }
  return <span className="text-white font-raela font-bold text-sm leading-snug">{val}</span>;
}

export const ComparisonMatrix = memo(({ tiers, benefits, hoveredTier, onHoverTier }: ComparisonMatrixProps) => (
  <div className="relative p-[1px] rounded-[32px] overflow-hidden bg-white/10 md:[backdrop-filter:blur(24px)]">
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none md:block hidden" />
    <div className="relative overflow-x-auto rounded-[31px] bg-black md:bg-black/60 shadow-2xl">
      <table
        className="w-full border-collapse min-w-[900px]"
        role="grid"
      >
        <thead>
          <tr className="border-b border-white/10">
            <th className="p-6 text-left sticky left-0 bg-black md:bg-[#0a0a0a]/95 md:[backdrop-filter:blur(24px)] z-30 min-w-[260px]">
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-neon-blue font-bold">Benefit</span>
            </th>
            {tiers.map((tier, idx) => (
              <th
                key={tier.name}
                className={`p-6 text-center relative transition-colors duration-300 ${hoveredTier === idx ? 'bg-white/[0.04]' : 'bg-transparent'}`}
                onMouseEnter={() => onHoverTier(idx)}
                onMouseLeave={() => onHoverTier(null)}
              >
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <div className={`h-0.5 w-10 bg-gradient-to-r ${tier.color} rounded-full`} />
                  <h3
                    className="text-xl font-raela font-black uppercase tracking-tighter text-white"
                    style={{
                      transition: 'transform 300ms ease',
                      transform: hoveredTier === idx ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    {tier.name}
                  </h3>
                  <span className="text-[9px] font-mono text-white/25 tracking-[0.5em] uppercase">Partner</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {benefits.map((benefit, bIdx) => (
            <tr key={bIdx} className="group/row hover:bg-white/[0.02] transition-colors">
              <td className="p-5 text-left sticky left-0 bg-black md:bg-[#0a0a0a]/95 md:[backdrop-filter:blur(24px)] z-20 border-r border-white/[0.06]">
                <span className="text-[13px] font-semibold text-white/80 group-hover/row:text-white transition-colors leading-snug block">
                  {benefit.name}
                </span>
                {benefit.note && (
                  <span className="text-[10px] text-white/25 font-mono uppercase tracking-wider mt-1 block">
                    {benefit.note}
                  </span>
                )}
              </td>
              {benefit.values.map((val, vIdx) => (
                <td
                  key={vIdx}
                  className={`p-5 text-center transition-colors duration-200 ${hoveredTier === vIdx ? 'bg-white/[0.03]' : ''}`}
                  onMouseEnter={() => onHoverTier(vIdx)}
                  onMouseLeave={() => onHoverTier(null)}
                >
                  <div className="flex items-center justify-center min-h-[36px]">
                    {renderCell(val, tiers[vIdx].accentHex)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
));

ComparisonMatrix.displayName = 'ComparisonMatrix';
