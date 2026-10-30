import { useEffect, useRef, useState } from 'react';

const footerLogoImg = '/assets/images/footer-logo.png';
const footerStair = '/assets/images/footer-stair.png';
const socialBgImg = '/assets/images/social-bg.png';
const footerMailImg = '/assets/images/footer-mail.png';
const footerInstaImg = '/assets/images/footer-insta.png';
const footerLinkedinImg = '/assets/images/footer-linkin.png';
const footerTwitterImg = '/assets/images/footer-twitter.png';

const SOCIAL_LINKS = [
  {
    id: 'mail',
    name: 'Email Us',
    href: 'mailto:contact@synquo.com',
    iconImg: footerMailImg,
    keyType: 'mail',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    href: '#social-instagram',
    iconImg: footerInstaImg,
    keyType: 'instagram',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: '#social-linkedin',
    iconImg: footerLinkedinImg,
    keyType: 'linkedin',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    href: '#social-twitter',
    iconImg: footerTwitterImg,
    keyType: 'twitter',
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
      className="footer-wrapper mb-4"
      aria-label="Site Footer"
    >
      <div className={`footer-card ${isCardVisible ? 'is-visible' : ''} ${isLogoVisible ? 'is-fully-visible' : ''}`}>
        <div className="footer-social-dock" role="navigation" aria-label="Social media keycaps">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`footer-social-key key-${item.keyType}`}
              aria-label={item.name}
            >
              <img
                src={socialBgImg}
                alt=""
                className="footer-key-socket"
                draggable={false}
              />
              <img
                src={item.iconImg}
                alt={item.name}
                className="footer-key-cap"
                draggable={false}
              />
            </a>
          ))}
        </div>
        <img
          src={footerStair}
          alt="Synquo Logo"
          className="footer-stair-img"
          loading="lazy"
          draggable={false}
        />
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
