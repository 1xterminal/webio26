import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-neon-orange/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[150px] pointer-events-none" />

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

        <p className="text-white/40 text-sm font-mono mb-10 leading-relaxed">
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
