'use client';

import { useEffect } from 'react';
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
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            <ScrollRestorer />
            {children}
        </ReactLenis>
    );
}
