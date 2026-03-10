'use client';

import { useCallback, useSyncExternalStore } from 'react';

export function useIsMobile() {
  return useSyncExternalStore(
    useCallback((callback: () => void) => {
      const mq = window.matchMedia('(max-width: 768px)');
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    }, []),
    () => window.matchMedia('(max-width: 768px)').matches,
    () => false // server snapshot
  );
}
