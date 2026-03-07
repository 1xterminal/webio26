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
    default: 'I/O FESTIVAL 2026 | Technology into Action',
    template: '%s | I/O FESTIVAL 2026',
  },
  description: 'The ultimate futuristic tech competition bringing together visionaries, developers, and creators to redefine the boundaries of what is possible.',
  keywords: ['hackathon', 'tech festival', 'coding competition', 'Indonesia', 'technology', 'innovation', 'Bauhaus', 'cyberpunk'],
  authors: [{ name: 'IO Festival Team' }],
  creator: 'IO Festival Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iofest.com',
    title: 'I/O FESTIVAL 2026 | Technology into Action',
    description: 'Join the ultimate futuristic tech competition. Web Dev, Data Science, and UI/UX Design tracks.',
    siteName: 'I/O FESTIVAL 2026',
    images: [
      {
        url: '/og-image.jpg', // Ideally we'd have this file, but defining the slot is good practice
        width: 1200,
        height: 630,
        alt: 'I/O FESTIVAL 2026 Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I/O FESTIVAL 2026',
    description: 'The ultimate futuristic tech competition. Register now.',
    creator: '@iofestival',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
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
