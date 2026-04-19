import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@next/third-parties/google';

const raela = localFont({
  src: [
    { path: './fonts/raelagrotesque/RaelaGrotesque-Light-BF67b427f312600.ttf', weight: '300', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-Bold-BF67b427f311913.ttf', weight: '700', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-Black-BF67b427f2c4ada.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-raela',
  display: 'swap',
});

const jakarta = localFont({
  src: [
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-jakarta',
  display: 'swap',
});

import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

import { SmoothScroll } from '@/components/effects/SmoothScroll';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://iofest.com'),
  title: {
    default: 'I/O FESTIVAL 2026 | Technology into Action, Ideas into Impact',
    template: '%s | I/O FESTIVAL 2026',
  },
  description: 'I/O Festival 2026: Ajang kompetisi IT nasional bergengsi (UI/UX, Web Dev, Business Case) untuk Mahasiswa & SMA/SMK. Menangkan total hadiah puluhan juta rupiah! 🚀',
  keywords: [
    'I/O Festival 2026', 'Kompetisi IT Nasional 2026', 'Lomba UI/UX Design', 'Lomba Web Development', 'Lomba Business Case',
    'Lomba IT Mahasiswa', 'Lomba IT SMA SMK', 'IT Festival Indonesia', 'BEM FTI UNTAR', 'Universitas Tarumanagara',
    'Lomba Desain Aplikasi', 'Lomba Pemrograman Web', 'Ide Bisnis Teknologi', 'Event IT Jakarta'
  ],
  authors: [{ name: 'BEM FTI UNTAR', url: 'https://bemftiuntar.com' }],
  creator: 'I/O Festival Team',
  publisher: 'BEM FTI UNTAR',
  applicationName: 'I/O Festival 2026',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://iofest.com',
    title: 'I/O FESTIVAL 2026 | Buktikan Inovasi Teknologimu! 🔥',
    description: 'Ikuti kompetisi IT skala nasional terbaik: UI/UX, Web Development, dan Business Case. Raih hadiah puluhan juta rupiah & sertifikat nasional. Daftar sekarang!',
    siteName: 'I/O FESTIVAL 2026',
    images: [
      {
        url: '/icon.png',
        width: 192,
        height: 192,
        alt: 'I/O FESTIVAL 2026 - Kompetisi Teknologi Terbesar Nasional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I/O FESTIVAL 2026 | Buktikan Skill IT Kamu! 🚀',
    description: 'Kompetisi IT Nasional: UI/UX, Web Dev, dan Business Case. Registrasi sekarang dan jadilah pemenang di I/O Festival 2026! ✨',
    creator: '@iofestival',
    images: ['/icon.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
};

import { Preloader } from '@/components/layout/Preloader';
import { PreloaderGate } from '@/components/layout/PreloaderGate';
import ErrorBoundary from '@/components/error/ErrorBoundary';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head />
      <body
        className={cn(
          raela.variable,
          jakarta.variable,
          'bg-black text-white font-sans antialiased overflow-x-hidden selection:bg-neon-orange/30 selection:text-white'
        )}
      >
        <Preloader />
        <PreloaderGate>
          <SmoothScroll>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:font-bold">Skip to content</a>
            <NoiseOverlay />

            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </SmoothScroll>
        </PreloaderGate>
      </body>
      <GoogleAnalytics gaId="G-1L3ZCMK7NG" />
    </html>
  );
}
