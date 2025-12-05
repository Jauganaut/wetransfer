/**
 * Standalone, memoized VideoBackground component
 *
 * Keeps the iframe mounted to avoid remounts / hook-context issues.
 * Posts a play message to the iframe when `active` becomes true.
 *
 * NOTE: This file is intentionally isolated from page-level components.
 */
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
interface VideoBackgroundProps {
  active: boolean;
}
/**
 * VideoBackground renders a non-interactive, full-bleed iframe video background
 * with a gradient overlay and graceful onError fallback.
 *
 * - Keeps the iframe mounted to avoid re-creating it between renders.
 * - Uses postMessage to attempt to trigger playback when active.
 * - Hides the iframe and logs if an error occurs.
 */
const VideoBackground = ({ active }: VideoBackgroundProps): JSX.Element => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    if (active && iframeRef.current) {
      try {
        // Best-effort: try to tell the iframe to play (may be blocked by CORS)
        iframeRef.current.contentWindow?.postMessage({ command: 'play' }, '*');
      } catch (err) {
        // Not fatal — rely on embed attributes (autoplay, muted, etc.)
        // Keep debug log for diagnostics.
        // eslint-disable-next-line no-console
        console.log('Autoplay postMessage blocked or failed; relying on embed attributes.', err);
      }
    }
  }, [active]);
  /**
   * Hide the iframe element and log a message when an error occurs.
   */
  const handleError = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    try {
      const target = e.target as HTMLIFrameElement | null;
      if (target) {
        target.style.display = 'none';
      }
    } catch (err) {
      // ignore
    }
    // eslint-disable-next-line no-console
    console.log('Embed load failed, using gradient fallback.');
  };
  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full z-0 transition-opacity duration-1000',
        active ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      aria-hidden
    >
      <>
        <iframe
          ref={iframeRef}
          src="https://embed-play-link.lovable.app/embed/70b2a757-42fb-4c75-b175-6f6555e828c0?autoplay=1&controls=0"
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-autoplay"
          onError={handleError}
          className={cn(
            'absolute inset-0 w-full h-full object-cover hidden md:block pointer-events-none user-select-none transform translate-z-0'
          )}
          title="Background video"
        />
        {/* Purple gradient overlay to ensure non-interactive visual cover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent z-10 pointer-events-none" />
      </>
    </div>
  );
};
VideoBackground.displayName = 'VideoBackground';
export default React.memo(VideoBackground);