/**
 * I/O FESTIVAL 2026 - Central Configuration & Constants
 * This file centralizes all "magic numbers" and business-logic constants 
 * to improve maintainability and flexibility.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iofest.com';

export const SITE_PHASE = 'archive' as const;

export const ARCHIVE_COPY = {
    instagramCta: 'Follow @iofest.untar',
    instagramUrl: 'https://instagram.com/iofest.untar',
};

// --- COMPETITION DATES ---
export const DATES = {
    REGISTRATION_OPEN: new Date("2026-03-15T00:00:00+07:00"),
    OFFICIAL_CASE_RELEASE: new Date("2026-04-09T10:00:00+07:00"),
    EARLY_BIRD_END: new Date("2026-04-19T23:59:59+07:00"),
    REGISTRATION_CLOSE: new Date("2026-04-30T23:59:59+07:00"),
    SUBMISSION_DEADLINE: new Date("2026-04-30T23:59:59+07:00"),
    JUDGING_PERIOD: "1 - 10 Mei",
    JUDGING_START: new Date("2026-05-01T00:00:00+07:00"),
    JUDGING_END: new Date("2026-05-10T23:59:59+07:00"),
    FINALIST_ANNOUNCE: new Date('2026-05-13T00:00:00+07:00'),
    FINAL_AWARDING: new Date('2026-06-04T00:00:00+07:00'),
};

// --- THEME COLORS ---
export const COLORS = {
    NEON_ORANGE: '#FF8B53',
    NEON_PURPLE: '#B664FB',
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
