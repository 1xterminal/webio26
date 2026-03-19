import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Hyper-vibrant 15-layer "Festive" system (Pure CSS) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
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
              'radial-gradient(circle at 85% 90%, rgba(255,107,0,0.25) 0%, transparent 25%)',
              'radial-gradient(circle at 15% 85%, rgba(29,188,211,0.25) 0%, transparent 30%)',
            ].join(','),
          }}
        />
        {/* Subtle texture grain */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none hidden md:block" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      <div className="z-10 text-center max-w-lg">
        <Image
          src="/assets/logo/logo-io.webp"
          alt="I/O Festival Logo"
          width={120}
          height={40}
          className="h-8 w-auto object-contain mx-auto mb-12 opacity-40"
        />

        <h1 className="font-raela font-black text-[10rem] md:text-[14rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 mb-2">
          404
        </h1>

        <h2 className="font-raela font-bold text-xl md:text-2xl text-white mb-4 uppercase tracking-[0.2em]">
          Halaman Tidak Ditemukan
        </h2>

        <p className="text-white/40 text-sm mb-10 leading-relaxed font-jakarta">
          Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-black bg-white px-6 py-3 hover:bg-neon-orange hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
