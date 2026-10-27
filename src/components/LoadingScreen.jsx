import { useEffect, useState } from 'react';

/**
 * LoadingScreen component
 * Displays only the green checks background during loading,
 * then smoothly fades away to reveal the website.
 */
export default function LoadingScreen({ minDuration = 1200, onFinished }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onFinished) onFinished();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onFinished]);

  return (
    <div 
      id="site-loading-screen" 
      className={`loading-screen-overlay green-checks-bg ${isLoading ? '' : 'loaded'}`}
      aria-hidden={!isLoading}
    >
      <div className="loading-indicator">
        <span className="loading-dot"></span>
        <span className="loading-dot"></span>
        <span className="loading-dot"></span>
      </div>
    </div>
  );
}
