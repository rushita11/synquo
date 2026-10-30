import { useEffect, useRef, useState } from 'react';

const footerLogoImg = '/assets/images/footer-logo.png';

// Social links configuration with keyboard keycap styling matching the design
const SOCIAL_KEYS = [
  {
    id: 'gmail-1',
    name: 'Email Us',
    href: 'mailto:contact@synquo.com',
    type: 'gmail',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    id: 'instagram-1',
    name: 'Instagram',
    href: '#social-instagram',
    type: 'instagram',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: 'linkedin-1',
    name: 'LinkedIn',
    href: '#social-linkedin',
    type: 'linkedin',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    id: 'x-1',
    name: 'X (Twitter)',
    href: '#social-x',
    type: 'x',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'gmail-2',
    name: 'Email Us (Support)',
    href: 'mailto:support@synquo.com',
    type: 'gmail',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    id: 'instagram-2',
    name: 'Instagram Agency',
    href: '#social-instagram',
    type: 'instagram',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: 'linkedin-2',
    name: 'LinkedIn Careers',
    href: '#social-linkedin',
    type: 'linkedin',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    id: 'x-2',
    name: 'X Agency',
    href: '#social-x',
    type: 'x',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

/**
 * FooterSection Component
 * Displays the brand footer with:
 * - Rich textured Renaissance backdrop (footer-bg.png)
 * - 3D mechanical keyboard-style social keys with tactile hover press states
 * - Giant luminous cyan "synquo" brand logo (footer-logo.png)
 * - Scroll-triggered entrance animation rising smoothly from the bottom when reaching the bottom of the page
 */
export default function FooterSection() {
  const footerRef = useRef(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsCardVisible(true);
      setIsLogoVisible(true);
      return;
    }

    // 1. Observer for footer card background entrance
    const cardObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardVisible(true);
          cardObserver.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );
    cardObserver.observe(el);

    // 2. Observer specifically for the logo: triggers only when footer is fully visible in viewport
    const checkFullyVisible = (entry) => {
      // Direct full intersection ratio
      if (entry.intersectionRatio >= 0.98) return true;

      const vh = window.innerHeight || document.documentElement.clientHeight;
      const rect = entry.boundingClientRect;

      // Geometrically fully contained inside viewport
      if (rect.top >= 0 && rect.bottom <= vh + 10) return true;

      // When viewport is shorter than the footer, triggers when bottom is fully reached
      if (rect.bottom <= vh + 5 && entry.intersectionRatio >= 0.6) return true;

      return false;
    };

    const logoObserver = new IntersectionObserver(
      ([entry]) => {
        if (checkFullyVisible(entry)) {
          setIsLogoVisible(true);
          logoObserver.disconnect();
        }
      },
      {
        threshold: [0.2, 0.5, 0.7, 0.8, 0.9, 0.95, 1.0],
      }
    );
    logoObserver.observe(el);

    // Fallback listener for fast scrolls/resizes
    const checkVisibility = () => {
      if (!el) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const rect = el.getBoundingClientRect();
      if ((rect.top >= 0 && rect.bottom <= vh + 10) || (rect.bottom <= vh + 5 && rect.top < 0)) {
        setIsLogoVisible(true);
        logoObserver.disconnect();
        window.removeEventListener('scroll', checkVisibility);
        window.removeEventListener('resize', checkVisibility);
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      cardObserver.disconnect();
      logoObserver.disconnect();
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="footer-wrapper"
      aria-label="Site Footer"
    >
      <div className={`footer-card ${isCardVisible ? 'is-visible' : ''} ${isLogoVisible ? 'is-fully-visible' : ''}`}>
        {/* Top Centered: 3D Keyboard Social Dock */}
        {/* <div className="footer-social-dock" role="navigation" aria-label="Social media keycaps">
          {SOCIAL_KEYS.slice(0, 4).map((key) => (
            <a
              key={key.id}
              href={key.href}
              className={`footer-keycap keycap-${key.type}`}
              title={key.name}
              aria-label={key.name}
            >
              {key.icon}
            </a>
          ))}

          <span className="footer-key-divider" aria-hidden="true" />

          {SOCIAL_KEYS.slice(4, 8).map((key) => (
            <a
              key={key.id}
              href={key.href}
              className={`footer-keycap keycap-${key.type}`}
              title={key.name}
              aria-label={key.name}
            >
              {key.icon}
            </a>
          ))}
        </div> */}

        <div className={`footer-logo-wrapper ${isLogoVisible ? 'is-visible' : ''}`}>
          <img
            src={footerLogoImg}
            alt="Synquo Logo"
            className="footer-logo-img"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </footer>
  );
}
