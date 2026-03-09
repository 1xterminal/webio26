import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-300">
      {/* Hyper-vibrant 15-layer "Festive" system (Pure CSS) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.5] md:opacity-[0.75]"
          style={{
            background: [
              'radial-gradient(ellipse 70% 60% at 0% 0%, rgba(29,188,211,0.30) 0%, transparent 80%)',
              'radial-gradient(ellipse 70% 60% at 100% 100%, rgba(168,86,238,0.25) 0%, transparent 80%)',
              'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(255,107,0,0.20) 0%, transparent 80%)',
              'radial-gradient(ellipse 70% 60% at 0% 100%, rgba(29,188,211,0.20) 0%, transparent 80%)',
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(168,86,238,0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 10% 20%, rgba(29,188,211,0.35) 0%, transparent 25%)',
              'radial-gradient(circle at 90% 10%, rgba(168,86,238,0.30) 0%, transparent 30%)',
            ].join(','),
          }}
        />
        {/* Subtle texture grain */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      <div className="relative z-10 animate-pulse flex flex-col items-center justify-center">
        <Image
          src="/assets/logo/logo-io.webp"
          alt="Loading..."
          width={120}
          height={120}
          priority
          className="opacity-70 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        />
      </div>
    </div>
  );
}
