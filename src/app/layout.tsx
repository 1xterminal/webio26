import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';

const raela = localFont({
  src: [
    { path: './fonts/raelagrotesque/RaelaGrotesque-Thin-BF67b427f305180.ttf', weight: '100', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-ExtraLight-BF67b427f310b80.ttf', weight: '200', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-Light-BF67b427f312600.ttf', weight: '300', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-Regular-BF67b427f3144cd.ttf', weight: '400', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-Medium-BF67b427f311230.ttf', weight: '500', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-SemiBold-BF67b427f313d28.ttf', weight: '600', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-Bold-BF67b427f311913.ttf', weight: '700', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-ExtraBold-BF67b427f30ffda.ttf', weight: '800', style: 'normal' },
    { path: './fonts/raelagrotesque/RaelaGrotesque-Black-BF67b427f2c4ada.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-raela',
  display: 'swap',
});

const jakarta = localFont({
  src: [
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/plusjakartasans/static/PlusJakartaSans-ExtraBold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-jakarta', // Mapping to existing variable for seamless replacement
  display: 'swap',
});

import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

import { SmoothScroll } from '@/components/effects/SmoothScroll';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://iofest.com'),
  title: {
    default: 'I/O FESTIVAL 2026 | Kompetisi IT Mahasiswa & Siswa Nasional',
    template: '%s | I/O FESTIVAL 2026',
  },
  description: 'I/O Festival 2026 adalah kompetisi IT tingkat nasional bergengsi untuk mahasiswa dan siswa SMA/SMK. Ikuti cabang lomba UI/UX Design, Web Development, dan Business Case. Daftar sekarang!',
  keywords: [
    'I/O Festival 2026', 'lomba IT tingkat nasional', 'kompetisi IT', 'lomba mahasiswa', 'lomba SMA SMK', 
    'kompetisi UI/UX', 'lomba Web Development', 'lomba Business Case', 'IT competition Indonesia', 
    'teknologi', 'inovasi', 'event IT 2026', 'Tarumanagara'
  ],
  authors: [{ name: 'BEM FTI UNTAR', url: 'https://bemftiuntar.com' }],
  creator: 'I/O Festival Team',
  applicationName: 'I/O Festival 2026',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://iofest.com',
    title: 'I/O FESTIVAL 2026 | Kompetisi IT Nasional',
    description: 'Daftarkan tim Anda di kompetisi IT nasional bergengsi: UI/UX Design, Web Development, dan Business Case. Buktikan inovasi teknologimu di I/O Festival 2026!',
    siteName: 'I/O FESTIVAL 2026',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'I/O FESTIVAL 2026 Preview - Kompetisi IT Nasional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I/O FESTIVAL 2026 | Buktikan Skill IT Kamu',
    description: 'Ajang kompetisi teknologi terbesar tahun ini. Bergabunglah dalam Web Dev, UI/UX, dan Business Case. Registrasi sekarang!',
    creator: '@iofestival',
    images: ['/twitter-image.jpg'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preload" href="/assets/logo/logo-io.webp" as="image" type="image/webp" />
        <link rel="preconnect" href="https://basemaps.cartocdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://basemaps.cartocdn.com" />
      </head>
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

            {children}
          </SmoothScroll>
        </PreloaderGate>
      </body>
    </html>
  );
}
