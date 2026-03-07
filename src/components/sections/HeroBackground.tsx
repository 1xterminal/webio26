'use client';

import { BauhausGrid } from '@/components/effects/BauhausGrid';

export function HeroBackground() {
    return (
        <>
            {/* Modern Bauhaus Pattern */}
            <BauhausGrid />

            {/* Background Gradients */}
            <div className="absolute inset-0 bg-black -z-10">
                <div
                    className="absolute top-[-20%] left-[-10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] rounded-full gpu"
                    style={{ background: 'radial-gradient(circle, rgba(182,100,251,0.20) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-[-20%] right-[-10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] rounded-full gpu"
                    style={{ background: 'radial-gradient(circle, rgba(85,213,231,0.10) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute top-[40%] left-[30%] w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] rounded-full gpu"
                    style={{ background: 'radial-gradient(circle, rgba(255,139,83,0.10) 0%, transparent 70%)' }}
                />
            </div>
        </>
    );
}

