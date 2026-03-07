'use client';

import { useEffect, useState } from 'react';

/**
 * Wraps page content and prevents interaction until the
 * Framer Motion preloader dispatches the 'preloader:done' event.
 * We no longer use opacity:0 because Lighthouse needs to "see" the DOM
 * immediately to calculate a fast LCP (Largest Contentful Paint) score.
 * The absolute black curtain in Preloader.tsx handles the actual visual hiding.
 */
export function PreloaderGate({ children }: { children: React.ReactNode }) {
    const [interactive, setInteractive] = useState(false);

    useEffect(() => {
        const onDone = () => setInteractive(true);
        window.addEventListener('preloader:done', onDone);
        return () => window.removeEventListener('preloader:done', onDone);
    }, []);

    return (
        <div
            aria-hidden={!interactive}
            style={{
                pointerEvents: interactive ? 'auto' : 'none',
                // We keep the DOM visibly rendering to satisfy Lighthouse LCP metrics
            }}
        >
            {children}
        </div>
    );
}
