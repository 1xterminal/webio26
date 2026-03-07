'use client';

import { useState, useEffect } from 'react';
import { getRegistrationStatus, type RegistrationStatus } from '@/lib/registration';

/**
 * Returns the current registration status, hydration-safe.
 * Initializes as 'upcoming' on server to avoid mismatch, 
 * then syncs to real status on client mount.
 */
export function useRegistrationStatus(): RegistrationStatus {
    const [status, setStatus] = useState<RegistrationStatus>('upcoming');

    useEffect(() => {
        setStatus(getRegistrationStatus());
    }, []);

    return status;
}
