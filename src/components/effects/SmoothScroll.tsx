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
    // Lenis gracefully handles touch devices natively via syncTouch: false
    // Never conditionally bypass the wrapper component, as React will destroy and remount 
    // the entirely nested DOM tree (the whole page) when swapping tags post-hydration.

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
