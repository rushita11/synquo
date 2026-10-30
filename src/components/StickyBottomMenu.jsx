import { useEffect, useState } from 'react';

/**
 * StickyBottomMenu component
 * Pinned at the bottom of the viewport across all sections.
 * Displays "Loading 100%" once the initial loading screen completes,
 * and reveals the navigation menu items once all images and text are loaded.
 */
export default function StickyBottomMenu({ screenLoadingDone = false }) {
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isMenuReady, setIsMenuReady] = useState(false);

  const menuItems = [
    { label: 'Our Work', href: '#work', id: 'menu-link-work' },
    { label: 'About us', href: '#about', id: 'menu-link-about' },
    { label: 'Book Now', href: '#book', id: 'menu-link-book' },
  ];

  // 1. Verify that all document images and web fonts are fully loaded
  useEffect(() => {
    let isMounted = true;

    const checkAllDone = async () => {
      try {
        // Wait for web fonts (e.g. Instrument Serif & Raleway)
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }

        // Wait for all <img> tags in the DOM
        const checkImages = () => {
          const imgs = Array.from(document.querySelectorAll('img'));
          if (imgs.length === 0) return Promise.resolve();

          const promises = imgs.map((img) => {
            if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
            return new Promise((resolve) => {
              const onFinish = () => {
                img.removeEventListener('load', onFinish);
                img.removeEventListener('error', onFinish);
                resolve();
              };
              img.addEventListener('load', onFinish);
              img.addEventListener('error', onFinish);
              setTimeout(onFinish, 2500); // Safety fallback
            });
          });

          return Promise.all(promises);
        };

        await checkImages();

        // Wait for window/document complete state
        if (document.readyState !== 'complete') {
          await new Promise((resolve) => {
            window.addEventListener('load', resolve, { once: true });
            setTimeout(resolve, 2500);
          });
        }
      } catch (err) {
        console.warn('Asset check:', err);
      } finally {
        if (isMounted) {
          setIsAssetsLoaded(true);
        }
      }
    };

    checkAllDone();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Animate counter to 100% once screen loading is done
  useEffect(() => {
    if (!screenLoadingDone) return;

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 18) + 12;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);
      } else {
        setPercent(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [screenLoadingDone]);

  // 3. Once screen loading is done, percent reached 100%, and all assets are loaded, reveal menu
  useEffect(() => {
    if (!screenLoadingDone || percent < 100 || !isAssetsLoaded) return;

    const timer = setTimeout(() => {
      setIsMenuReady(true);
    }, 650);

    return () => clearTimeout(timer);
  }, [screenLoadingDone, percent, isAssetsLoaded]);

  return (
    <div 
      className={`sticky-bottom-menu-dock ${screenLoadingDone ? 'is-dock-visible' : 'is-dock-waiting'}`} 
      role="region" 
      aria-label="Sticky bottom navigation dock"
    >
      <nav 
        id="bottom-sticky-nav" 
        className="sticky-bottom-menu-card"
        aria-label="Bottom Navigation"
      >
        {/* Loading State: Loading 100% */}
        <div 
          className={`menu-loading-container ${isMenuReady ? 'is-hidden' : 'is-visible'}`}
          aria-live="polite"
          aria-hidden={isMenuReady}
        >
          <span className="menu-loading-text">
            Loading {percent}%
          </span>
        </div>

        {/* Ready State: Navigation Menu */}
        <div 
          className={`menu-links-container ${isMenuReady ? 'is-visible' : 'is-hidden'}`}
          aria-hidden={!isMenuReady}
        >
          {menuItems.map((item) => (
            <a
              key={item.label}
              id={item.id}
              href={item.href}
              className="menu-link"
              tabIndex={isMenuReady ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
