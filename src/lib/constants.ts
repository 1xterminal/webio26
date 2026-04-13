/**
 * I/O FESTIVAL 2026 - Central Configuration & Constants
 * This file centralizes all "magic numbers" and business-logic constants 
 * to improve maintainability and flexibility.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iofest.com';

// --- COMPETITION DATES ---
export const DATES = {
    REGISTRATION_OPEN: new Date("2026-03-15T00:00:00+07:00"),
    EARLY_BIRD_END: new Date("2026-04-19T23:59:59+07:00"),
    REGISTRATION_CLOSE: new Date("2026-04-30T23:59:59+07:00"),
    PRELIMINARY: new Date('2026-05-01T00:00:00'),
    FINALIST_ANNOUNCE: new Date('2026-05-13T00:00:00'),
    FINAL_AWARDING: new Date('2026-06-04T00:00:00'),
};

// --- WEBGL GALLERY CONFIG ---
export const GALLERY_CONFIG = {
    MESH_COUNT_DESKTOP: 200,
    MESH_COUNT_MOBILE: 80,
    CAMERA_Z: 10,
    DRAG_SENSITIVITY: 1.5,
    DRAG_DAMPING: 0.1,
    MAX_Z: 12,
    MIN_Z: -30,
};

// --- THEME COLORS ---
export const COLORS = {
    NEON_ORANGE: '#ff8c42',
    NEON_PURPLE: '#a64dff',
    NEON_CYAN: '#55D5E7',
    BACKGROUND: '#0A0A0A',
};

// --- SEO DEFAULTS ---
export const SEO = {
    TITLE: 'I/O FESTIVAL 2026 | Technology into Action',
    DESCRIPTION: 'The ultimate futuristic tech competition bringing together visionaries, developers, and creators to redefine the boundaries of what is possible.',
};

// --- FEATURE FLAGS ---
export const FEATURES = {
    // Toggle for PPTI BCA promo banners (Home Page & Competition Details)
    SHOW_PPTI_BCA_PROMO: true,
};
