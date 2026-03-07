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

export function StarDust() {
    const ref = useRef<HTMLCanvasElement>(null);
    const raf = useRef(0);
    const motes = useRef<Mote[]>([]);

    useEffect(() => {
        const cvs = ref.current;
        if (!cvs) return;
        const ctx = cvs.getContext('2d');
        if (!ctx) return;

        function resize() {
            if (!cvs) return;
            cvs.width = window.innerWidth;
            cvs.height = window.innerHeight;
        }
        resize();

        motes.current = Array.from({ length: MOTE_COUNT }, () =>
            spawnMote(cvs.width, cvs.height)
        );
        // one big star
        motes.current.push({
            x: Math.random() * cvs.width,
            y: Math.random() * cvs.height * 0.6,
            size: 5,
            vx: 0.02,
            vy: -0.01,
            alpha: 0.35,
            flicker: 0,
            phase: 0,
        });

        function render() {
            if (!ctx || !cvs) return;
            
            // Bypass extremely expensive particle math and canvas draws entirely on mobile viewports
            if (window.innerWidth >= 768) {
                ctx.clearRect(0, 0, cvs.width, cvs.height);

                const cx = cvs.width * 0.5;
                const cy = cvs.height * 0.45;
                const radius = Math.min(cvs.width, cvs.height) * 0.8;
                const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
                glow.addColorStop(0, 'rgba(160, 165, 180, 0.025)');
                glow.addColorStop(0.4, 'rgba(155, 160, 175, 0.025)');
                glow.addColorStop(0.7, 'rgba(140, 145, 165, 0.02)');
                glow.addColorStop(0.9, 'rgba(100, 110, 140, 0.008)');
                glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = glow;
                ctx.fillRect(0, 0, cvs.width, cvs.height);

                for (const m of motes.current) {
                    m.x += m.vx;
                    m.y += m.vy;
                    if (m.x < -5) m.x = cvs.width + 5;
                    if (m.x > cvs.width + 5) m.x = -5;
                    if (m.y < -5) m.y = cvs.height + 5;
                    if (m.y > cvs.height + 5) m.y = -5;

                    ctx.beginPath();
                    ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(220,220,230,${m.alpha.toFixed(3)})`;
                    ctx.fill();
                }
            }

            raf.current = requestAnimationFrame(render);
        }

        render();
        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(raf.current);
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
