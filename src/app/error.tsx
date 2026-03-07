'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="glass-card p-12 rounded-2xl border border-white/10 text-center max-w-lg w-full">
        <h2 className="font-raela font-bold text-4xl text-neon-orange mb-4">SYSTEM MALFUNCTION</h2>
        <p className="text-white/60 mb-8 font-sans">
          A critical error has occurred in the neural link. Our engineers have been notified.
        </p>
        <button
          onClick={reset}
          className="px-8 py-3 bg-neon-blue/10 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 font-raela font-bold rounded-lg uppercase tracking-wider"
        >
          Re-initialize Link
        </button>
      </div>
    </div>
  );
}
