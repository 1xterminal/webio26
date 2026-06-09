'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import WebGLGallery from '@/lib/WebGLGallery';

export default function Gallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
    const [hasExploredArchive, setHasExploredArchive] = useState(false);

    const hideExplorePrompt = useCallback(() => {
        setHasExploredArchive(true);
    }, []);

    const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
        if (hasExploredArchive) return;
        pointerStartRef.current = { x: event.clientX, y: event.clientY };
    }, [hasExploredArchive]);

    const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
        if (hasExploredArchive || !pointerStartRef.current) return;

        const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
        const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

        if (Math.max(deltaX, deltaY) >= 8) {
            hideExplorePrompt();
        }
    }, [hasExploredArchive, hideExplorePrompt]);

    const handlePointerEnd = useCallback(() => {
        pointerStartRef.current = null;
    }, []);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        let galleryApp: WebGLGallery | null = null;
        let isInitialized = false;

        const initGallery = () => {
            if (isInitialized || !containerRef.current || !canvasRef.current) return;
            isInitialized = true;
            galleryApp = new WebGLGallery(containerRef.current, canvasRef.current, hideExplorePrompt);
        };

        const executeInit = () => {
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(initGallery);
            } else {
                setTimeout(initGallery, 1200);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    executeInit();
                    observer.disconnect(); // Only need to initialize it once
                }
            },
            { rootMargin: '800px' } // Load slightly before it comes into view
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
            if (galleryApp) {
                galleryApp.destroy();
            }
        };
    }, [hideExplorePrompt]);

    return (
        <section
            className="relative w-full h-[82vh] min-h-[620px] overflow-hidden flex items-center justify-center z-0"
        >
            {/* Overlay Text */}
            <div
                aria-hidden={hasExploredArchive}
                className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center select-none transition-all duration-500 ease-[0.16,1,0.3,1]"
                style={{
                    opacity: hasExploredArchive ? 0 : 1,
                    transform: hasExploredArchive ? 'scale(0.98)' : 'scale(1)',
                }}
            >
                <h2 className="font-raela font-bold text-4xl text-white uppercase tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] text-center">
                    Archived Memories
                </h2>
                <p className="text-white/40 mt-2 font-sans text-sm md:text-base tracking-wide uppercase hidden md:block">
                    Drag around to explore the archive
                </p>
                <p className="text-white/40 mt-2 font-sans text-sm tracking-wide uppercase md:hidden">
                    Swipe &amp; pinch through the archive
                </p>
            </div>

            {/* WebGL Canvas Container */}
            <div
                ref={containerRef}
                data-archive-explored={hasExploredArchive}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
                onPointerLeave={handlePointerEnd}
                onTouchStart={(event) => {
                    if (event.touches.length > 1) hideExplorePrompt();
                }}
            >
                <canvas ref={canvasRef} className="w-full h-full outline-none touch-pan-y" />
            </div>
        </section>
    );
}
