import { useState, useCallback } from 'react';

type DownloadStatus = 'idle' | 'loading' | 'success';

export function useDownloadInteraction() {
  const [status, setStatus] = useState<DownloadStatus>('idle');

  const handleDownload = useCallback((e: React.MouseEvent<HTMLAnchorElement>, url?: string) => {
    // If the button is already processing, prevent re-clicks
    if (status !== 'idle') {
      e.preventDefault();
      return;
    }

    // Set status to loading
    setStatus('loading');

    // After a short delay, simulate the download starting/finishing
    // The actual download happens natively via the anchor tag href & download attributes.
    // This timeout provides a faux "processing" visual state for premium feel.
    setTimeout(() => {
      setStatus('success');
      
      // Keep the success state visible before reverting back to idle
      setTimeout(() => {
        setStatus('idle');
      }, 2500); 
    }, 800);
  }, [status]);

  return { status, handleDownload };
}
