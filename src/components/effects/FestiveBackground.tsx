'use client';



interface FestiveBackgroundProps {
    accentColor?: string; // e.g. '#A856EE' (purple) or '#1DBCD3' (cyan)
}

/**
 * FestiveBackground - A hyper-vibrant 15-layer "Festive" system (Pure CSS)
 * Optimized for GPU rendering and used across Competition and Sponsorship pages.
 */
export default function FestiveBackground({ accentColor = '#FF8B53' }: FestiveBackgroundProps) {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {/* The Gradient System - Optimized for Mobile (Lower Opacity) */}
            <div
                className="absolute inset-0 opacity-[0.25] md:opacity-[0.65] lg:opacity-[0.85] transform-gpu"
                style={{
                    background: `
                        /* Large Base Fields */
                        radial-gradient(ellipse 70% 60% at 0% 0%,       ${accentColor}40 0%, transparent 80%),
                        radial-gradient(ellipse 70% 60% at 100% 100%,  rgba(168,86,238,0.35) 0%, transparent 80%),
                        radial-gradient(ellipse 70% 60% at 100% 0%,    ${accentColor}30 0%, transparent 80%),
                        radial-gradient(ellipse 70% 60% at 0% 100%,    rgba(255,107,0,0.30) 0%, transparent 80%),
                        
                        /* Secondary Mid-fields */
                        radial-gradient(ellipse 50% 50% at 50% -10%,   rgba(29,188,211,0.25) 0%, transparent 75%),
                        radial-gradient(ellipse 50% 50% at 50% 110%,   rgba(168,86,238,0.25) 0%, transparent 75%),
                        radial-gradient(ellipse 45% 45% at -15% 50%,   ${accentColor}25 0%, transparent 70%),
                        radial-gradient(ellipse 45% 45% at 115% 50%,   rgba(255,107,0,0.25) 0%, transparent 70%),
                        
                        /* High-Intensity "Laser" Accents */
                        radial-gradient(circle at 12% 25%,             ${accentColor}45 0%, transparent 20%),
                        radial-gradient(circle at 88% 15%,             rgba(168,86,238,0.40) 0%, transparent 25%),
                        radial-gradient(circle at 82% 85%,             rgba(255,107,0,0.35) 0%, transparent 20%),
                        radial-gradient(circle at 18% 75%,             rgba(29,188,211,0.35) 0%, transparent 25%),
                        
                        /* Internal Pop/Glow */
                        radial-gradient(ellipse 40% 40% at 35% 40%,    rgba(29,188,211,0.18) 0%, transparent 60%),
                        radial-gradient(ellipse 40% 40% at 65% 60%,    rgba(168,86,238,0.18) 0%, transparent 60%),
                        radial-gradient(ellipse 35% 35% at 50% 50%,    rgba(255,255,255,0.08) 0%, transparent 50%)
                    `
                }}
            />

        </div>
    );
}
