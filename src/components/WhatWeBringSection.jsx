import { useEffect, useRef, useState, useCallback } from 'react';
import { smoothScrollTo } from '../hooks/useSmoothScroll';

/**
 * Slide configuration data for the 4 storytelling slides
 * Extracted from project design assets and reference screenshots.
 */
const SLIDES = [
  {
    id: 'branding',
    tabName: 'Branding',
    headingPrefix: 'Build a ',
    highlightWord: 'Brand',
    headingSuffix: ' That',
    headingSecondLine: 'Looks Like You',
    description:
      'From logos and brand identities to product labels, packaging, mockups, brand collateral, and social media assets every detail designed to make your brand stand out.',
    imageSrc: '/assets/images/brand-card.png',
    imageAlt: 'Branding identity illustration with typography curves and color swatches',
    theme: {
      textColor: '#5055B8',
      highlightBg: '#E3E5FF',
      highlightBorder: '#5055B8',
      accentColor: '#5558C9',
    },
  },
  {
    id: 'web-app',
    tabName: 'Web & App',
    headingPrefix: '',
    highlightWord: 'Websites',
    headingSuffix: ' that stand out.',
    headingSecondLine: 'Apps that stand apart.',
    description:
      'From business websites and landing pages to web applications and mobile apps, we turn your ideas into digital experiences that capture attention and keep your audience coming back.',
    imageSrc: '/assets/images/website-card.png',
    imageAlt: 'Website and mobile application wireframe interface illustration',
    theme: {
      textColor: '#9B287B',
      highlightBg: '#F8D8FC',
      highlightBorder: '#9B287B',
      accentColor: '#B8188E',
    },
  },
  {
    id: 'ui-ux',
    tabName: 'UI/UX Design',
    headingPrefix: 'Make Every ',
    highlightWord: 'Interface',
    headingSuffix: '',
    headingSecondLine: 'Feel Intuitive.',
    description:
      'From user flows and wireframes to interactive prototypes and interface design we make complex journeys feel simple, intuitive, and effortless.',
    imageSrc: '/assets/images/interface-card.png',
    imageAlt: 'UI/UX interface wireframe and user journey flow diagram illustration',
    theme: {
      textColor: '#2E3A59',
      highlightBg: '#DCE6F5',
      highlightBorder: '#2E3A59',
      accentColor: '#2A3656',
    },
  },
  {
    id: 'ai-tool',
    tabName: 'AI Tool',
    headingPrefix: 'Your ',
    highlightWord: 'Ai Idea',
    headingSuffix: ' Make Sense.',
    headingSecondLine: '',
    description:
      'From AI-powered platforms and intelligent dashboards to smart tools and automated workflows we design experiences that make powerful technology feel simple and useful.',
    imageSrc: '/assets/images/ai-card.png',
    imageAlt: 'AI platform dashboard with assistant bot illustration',
    theme: {
      textColor: '#8B1E2D',
      highlightBg: '#FDE2E2',
      highlightBorder: '#8B1E2D',
      accentColor: '#781827',
    },
  },
];

/**
 * WhatWeBringSection Component
 * Scroll-driven pinned storytelling presentation with 4 interactive slides.
 * - Pinned viewport scroll step interaction
 * - Animated left-to-right text highlight bounding box with Figma handles
 * - Synchronized 2-column slide transitions
 * - Bottom tab interaction matching what-we-bg-img.png folders
 */
export default function WhatWeBringSection() {
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  // Trigger animations when the storytelling section enters the viewport
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle scroll-driven step detection through the pinned scroll track
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current || !stickyRef.current) {
            ticking = false;
            return;
          }
          const rect = trackRef.current.getBoundingClientRect();
          const containerHeight = stickyRef.current.offsetHeight;
          const totalScrollable = rect.height - containerHeight;

          if (totalScrollable > 0) {
            // Sticky pins at top: 15px (10px on mobile screens)
            const stickyTopOffset = window.innerWidth <= 768 ? 10 : 15;
            const scrolled = stickyTopOffset - rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

            // Divide into 4 steps: [0..0.25), [0.25..0.5), [0.5..0.75), [0.75..1.0]
            const calculatedIndex = Math.min(3, Math.max(0, Math.floor(progress * 4)));
            setActiveIndex((prev) => (prev !== calculatedIndex ? calculatedIndex : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Jump smoothly to a specific slide upon clicking a bottom folder tab
  const handleTabClick = useCallback((index) => {
    if (!trackRef.current || !stickyRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const containerHeight = stickyRef.current.offsetHeight;
    const totalScrollable = rect.height - containerHeight;
    const stickyTopOffset = window.innerWidth <= 768 ? 10 : 15;
    const startOfPin = window.scrollY + (rect.top - stickyTopOffset);
    // Center point of each slide's scroll zone: 0.125, 0.375, 0.625, 0.875
    const targetProgress = (index + 0.5) / 4;
    const targetY = startOfPin + targetProgress * totalScrollable;
    smoothScrollTo(targetY, 650);
  }, []);

  return (
    <section
      id="what-we-bring"
      ref={trackRef}
      className="storytelling-track w-full px-4 sm:px-6 lg:px-[15px] my-4 relative z-10 select-none"
      aria-label="What We Bring to the Table"
    >
      {/* Sticky viewport frame pinned for 4 scroll steps */}
      <div ref={stickyRef} className="storytelling-sticky-container">
        <div className="storytelling-canvas-card">
          {/* Top Section Header */}
          <header className="storytelling-header">
            <h2 className="storytelling-main-title">
              Here&apos;s what we bring to the table.
            </h2>
          </header>

          {/* Center White Showcase Card */}
          <div className="storytelling-showcase-box">
            {SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;
              const isPrev = index < activeIndex;
              // Slide 0 animates freshly once scrolled into view; subsequent slides animate on change
              const isRenderActive = isActive && (hasEnteredView || index > 0);
              const statusClass = isRenderActive
                ? 'is-active'
                : isPrev
                ? 'is-inactive is-prev'
                : 'is-inactive is-next';

              return (
                <article
                  key={`${slide.id}-${isRenderActive ? 'active' : 'idle'}`}
                  id={`storytelling-slide-${slide.id}`}
                  className={`storytelling-slide ${statusClass}`}
                  aria-hidden={!isActive}
                >
                  {/* Left Column: Visual Illustration Asset */}
                  <div className="storytelling-visual-col">
                    <div className="storytelling-img-frame">
                      <img
                        src={slide.imageSrc}
                        alt={slide.imageAlt}
                        className="storytelling-slide-img"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Right Column: Title with Highlighted Bounding Box and Description */}
                  <div className="storytelling-content-col">
                    <h3
                      className="storytelling-slide-heading"
                      style={{ color: slide.theme.textColor }}
                    >
                      {slide.headingPrefix}

                      {/* Animated Bounding Box Highlight */}
                      <span
                        className="highlight-box-wrapper"
                        style={{
                          '--highlight-bg': slide.theme.highlightBg,
                          '--highlight-border': slide.theme.highlightBorder,
                        }}
                      >
                        <span className="highlight-box-backdrop" aria-hidden="true" />
                        <span className="highlight-box-text">
                          {slide.highlightWord}
                        </span>

                        {/* Figma-style Selection Handles */}
                        <span className="selection-handle handle-top-stem" aria-hidden="true" />
                        <span className="selection-handle handle-top-dot" aria-hidden="true" />
                        <span className="selection-handle handle-tl" aria-hidden="true" />
                        <span className="selection-handle handle-tr" aria-hidden="true" />
                        <span className="selection-handle handle-bl" aria-hidden="true" />
                        <span className="selection-handle handle-br" aria-hidden="true" />
                      </span>

                      {slide.headingSuffix}

                      {slide.headingSecondLine && (
                        <>
                          <br />
                          {slide.headingSecondLine}
                        </>
                      )}
                    </h3>

                    <p className="storytelling-slide-desc">
                      {slide.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Interactive Folder Tabs */}
          <nav
            className="storytelling-folder-tabs"
            aria-label="Storytelling slide tabs"
          >
            {SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`tab-${slide.id}`}
                  type="button"
                  onClick={() => handleTabClick(index)}
                  className={`storytelling-tab-btn ${isActive ? 'is-tab-active' : ''}`}
                  aria-selected={isActive}
                  role="tab"
                  aria-controls={`storytelling-slide-${slide.id}`}
                >
                  <span className="sr-only">Go to slide {slide.tabName}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
