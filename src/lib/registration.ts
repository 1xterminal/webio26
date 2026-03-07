'use client';

// ── Registration Date Gates (WIB = UTC+7) ──
const REGISTRATION_OPEN = new Date('2026-03-15T00:00:00+07:00');
const REGISTRATION_CLOSE = new Date('2026-04-30T23:59:59+07:00');

export type RegistrationStatus = 'upcoming' | 'open' | 'closed';

export function getRegistrationStatus(now = new Date()): RegistrationStatus {
    if (now < REGISTRATION_OPEN) return 'upcoming';
    if (now > REGISTRATION_CLOSE) return 'closed';
    return 'open';
}

/** Determine if we're in early-bird or regular pricing window */
const EARLY_BIRD_END = new Date('2026-04-05T23:59:59+07:00');

export function isEarlyBird(now = new Date()): boolean {
    return now >= REGISTRATION_OPEN && now <= EARLY_BIRD_END;
}
