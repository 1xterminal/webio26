'use client';

import { useEffect, useRef } from 'react';
import WebGLGallery from '@/lib/WebGLGallery';

export function Gallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        // Initialize WebGL Application
        const galleryApp = new WebGLGallery(containerRef.current, canvasRef.current);

        return () => {
            galleryApp.destroy();
        };
    }, []);

    return (
        <section
            className="relative w-full h-screen overflow-hidden flex items-center justify-center -my-20 z-0"
            style={{
                // This creates a seamless fade at the top and bottom of the component
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            }}
        >
            {/* Overlay Text */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center pt-24 select-none">
                <h2 className="font-raela font-bold text-4xl text-white/80 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    Archived Memories
                </h2>
                <p className="text-white/40 mt-2 font-sans text-sm md:text-base tracking-wide uppercase">
                    Drag around to explore the history
                </p>
            </div>

            {/* WebGL Canvas Container */}
            <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
                <canvas ref={canvasRef} className="w-full h-full outline-none touch-none" />
            </div>

            {/* Subtle Gradient Overlays for Depth, removed hard black background to allow seamless scroll */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />
        </section>
    );
}
