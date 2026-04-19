'use client';

import { useEffect, useRef } from 'react';

const MOTE_COUNT = 40;

interface Mote {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
    flicker: number;
    phase: number;
}

function spawnMote(w: number, h: number): Mote {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08 - 0.02,
        alpha: Math.random() * 0.5 + 0.1,
        flicker: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
    };
}

export default function StarDust() {
    const ref = useRef<HTMLCanvasElement>(null);
    const raf = useRef(0);
    const motes = useRef<Mote[]>([]);

    useEffect(() => {
        const cvs = ref.current;
        if (!cvs) return;
        const ctx = cvs.getContext('2d');
        if (!ctx) return;

        // Cache the glow gradient — recreated only on resize, not every frame
        let cachedGlow: CanvasGradient | null = null;

        function buildGlow() {
            if (!ctx || !cvs) return;
            const cx = cvs.width * 0.5;
            const cy = cvs.height * 0.45;
            const radius = Math.min(cvs.width, cvs.height) * 0.8;
            const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            glow.addColorStop(0, 'rgba(160, 165, 180, 0.025)');
            glow.addColorStop(0.4, 'rgba(155, 160, 175, 0.025)');
            glow.addColorStop(0.7, 'rgba(140, 145, 165, 0.02)');
            glow.addColorStop(0.9, 'rgba(100, 110, 140, 0.008)');
            glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            cachedGlow = glow;
        }

        let logicalWidth = 0;
        let logicalHeight = 0;

        function resize() {
            if (!cvs) return;
            const dpr = window.devicePixelRatio || 1;
            logicalWidth = window.innerWidth;
            logicalHeight = window.innerHeight;
            cvs.width = logicalWidth * dpr;
            cvs.height = logicalHeight * dpr;
            cvs.style.width = `${logicalWidth}px`;
            cvs.style.height = `${logicalHeight}px`;
            ctx?.scale(dpr, dpr);
            buildGlow();
        }

        resize();

        motes.current = Array.from({ length: MOTE_COUNT }, () =>
            spawnMote(logicalWidth, logicalHeight)
        );
        motes.current.push({
            x: Math.random() * logicalWidth,
            y: Math.random() * logicalHeight * 0.6,
            size: 5,
            vx: 0.02,
            vy: -0.01,
            alpha: 0.35,
            flicker: 0,
            phase: 0,
        });

        const moteColors = motes.current.map(m => `rgba(220,220,230,${m.alpha})`);
        const mq = window.matchMedia('(min-width: 768px)');
        let isVisible = true;

        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0.01 });
        observer.observe(cvs);

        function render() {
            if (!ctx || !cvs || !isVisible) {
                if (!isVisible) raf.current = requestAnimationFrame(render);
                return;
            }

            ctx.clearRect(0, 0, logicalWidth, logicalHeight);

            if (cachedGlow) {
                ctx.fillStyle = cachedGlow;
                ctx.fillRect(0, 0, logicalWidth, logicalHeight);
            }

            for (let i = 0; i < motes.current.length; i++) {
                const m = motes.current[i];
                m.x += m.vx;
                m.y += m.vy;
                if (m.x < -5) m.x = logicalWidth + 5;
                if (m.x > logicalWidth + 5) m.x = -5;
                if (m.y < -5) m.y = logicalHeight + 5;
                if (m.y > logicalHeight + 5) m.y = -5;

                ctx.beginPath();
                ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
                ctx.fillStyle = moteColors[i];
                ctx.fill();
            }

            raf.current = requestAnimationFrame(render);
        }

        function handleMqChange(e: MediaQueryListEvent) {
            if (e.matches) {
                render();
            } else {
                cancelAnimationFrame(raf.current);
            }
        }

        // Only start on desktop
        if (mq.matches) render();
        mq.addEventListener('change', handleMqChange);
        window.addEventListener('resize', resize, { passive: true });

        return () => {
            cancelAnimationFrame(raf.current);
            mq.removeEventListener('change', handleMqChange);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            className="fixed inset-0 z-1 pointer-events-none"
            aria-hidden="true"
        />
    );
}
