'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

function ScrollRestorer() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            // Only scroll to top if there is no hash in the URL
            if (!window.location.hash) {
                lenis.scrollTo(0, { immediate: true });
            }
        }
    }, [pathname, searchParams, lenis]);

    return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    // Disable Lenis on touch devices — native iOS momentum scrolling is superior
    // and Lenis' JS-driven approach fights the browser's native behavior
    const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

    if (isTouchDevice) {
        // On touch devices: render children directly with no Lenis overhead
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,        // Slightly snappier feel on desktop
                duration: 1.2,
                smoothWheel: true,
                syncTouch: false,  // Never hijack touch events
            }}
        >
            <Suspense fallback={null}>
                <ScrollRestorer />
            </Suspense>
            {children}
        </ReactLenis>
    );
}

