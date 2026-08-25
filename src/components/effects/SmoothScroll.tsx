'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

function ScrollRestorer() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        const scrollToHash = (hash: string, immediate = true) => {
            const id = decodeURIComponent(hash.replace('#', ''));
            const target = document.getElementById(id);
            if (!target) return false;

            lenis.scrollTo(target, {
                immediate,
                offset: -96,
            });
            return true;
        };

        const restoreScroll = () => {
            if (window.location.hash) {
                scrollToHash(window.location.hash);
                return;
            }

            lenis.scrollTo(0, { immediate: true });
        };

        const frame = requestAnimationFrame(restoreScroll);
        const timeout = window.setTimeout(restoreScroll, 2200);

        const handleHashChange = () => {
            window.setTimeout(() => {
                scrollToHash(window.location.hash, false);
            }, 0);
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            cancelAnimationFrame(frame);
            window.clearTimeout(timeout);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [pathname, searchParams, lenis]);

    return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.12,       // More responsive
                duration: 0.9,    // Was 1.5 — felt laggy
                smoothWheel: true,
                syncTouch: false, // Keep native touch scroll on mobile
                wheelMultiplier: 1.2, // Slightly quicker wheel response
            }}
        >
            <Suspense fallback={null}>
                <ScrollRestorer />
            </Suspense>
            {children}
        </ReactLenis>
    );
}
