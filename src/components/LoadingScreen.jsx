import { useEffect, useState, useRef } from 'react';

/**
 * LoadingScreen component
 * Features the brand green banner canvas with outer padding and rounded corners,
 * matching the hero section, with a smooth percentage counter at the bottom (20px to 25px).
 */
export default function LoadingScreen({ minDuration = 1400, onFinished }) {
  const [percent, setPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const duration = Math.max(1400, minDuration);
    const startTime = performance.now();
    let lastReported = -1;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Silky-smooth cubic ease-in-out curve
      // Starts gently, accelerates smoothly through mid-load, and decelerates into 100%
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const current = Math.min(100, Math.round(eased * 100));
      if (current !== lastReported) {
        lastReported = current;
        setPercent(current);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(updateCounter);
      } else {
        setPercent(100);
        const finishTimer = setTimeout(() => {
          setIsLoading(false);
          if (onFinished) onFinished();

          const removeTimer = setTimeout(() => {
            setIsRendered(false);
          }, 850);
          return () => clearTimeout(removeTimer);
        }, 240);

        return () => clearTimeout(finishTimer);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateCounter);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [minDuration, onFinished]);

  if (!isRendered) return null;

  return (
    <div
      id="site-loading-screen"
      className={`loading-screen-overlay ${isLoading ? '' : 'loaded'}`}
      aria-hidden={!isLoading}
    >
      <div className="loading-canvas green-checks-bg">
        <div className="loading-counter-bottom" aria-live="polite">
          <span className="loading-counter-number">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
