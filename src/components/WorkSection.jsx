import { useRef, useState, useEffect } from 'react';

// ─── [WORKSECTION CHANGE] Animate.css CDN loader ─────────────────────────────
// Dynamically injects animate.css from CDN once when WorkSection mounts.
// Kept here so it is self-contained in this file; your friend's sections are
// NOT touched. If animate.css is later npm-installed project-wide, swap this
// hook for:  import 'animate.css';  at the top of this file and delete the hook.
function useAnimateCss() {
  useEffect(() => {
    const LINK_ID = 'animate-css-cdn';
    if (document.getElementById(LINK_ID)) return; // already injected — skip
    const link = document.createElement('link');
    link.id = LINK_ID;
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    document.head.appendChild(link);
  }, []);
}
// ─────────────────────────────────────────────────────────────────────────────

// const workBgImg = '/assets/images/work-bg.png';
const aminoImg = '/assets/images/amino.png';
const t3 = '/assets/images/t3.png';
const glass = '/assets/images/glass-card.png';
const medallion = '/assets/images/Medallion.png';
const yourwai = '/assets/images/yourvi-card.png';
const drillclub = '/assets/images/drillclub.png';

// Array for work projects, using the same data structure as requested
const workProjects = [
  {
    id: 'amino',
    title: 'Amino',
    image: aminoImg,
    link: '#work-amino',
    tags: ['Logo', 'Website', 'Branding'],
  },
  {
    id: 'glass-1',
    title: 'Glass',
    image: glass,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },
  {
    id: 'medallion',
    title: 'Medallion',
    image: medallion,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },
  {
    id: 't3',
    title: 'T3',
    image: t3,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },
  {
    id: 'yourwai',
    title: 'Yourwai',
    image: yourwai,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },
  {
    id: 'drillclub',
    title: 'DrillClub',
    image: drillclub,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },
];

// ─── [WORKSECTION CHANGE] WorkProjectCard — animate__fadeInUp on scroll ───────
// Replaced the old custom wow-card-animate / wowFadeInUp keyframe approach with
// Animate.css  animate__fadeInUp  triggered by IntersectionObserver.
// Changes vs original:
//   • isVisible state drives  animate__animated + animate__fadeInUp  classes
//   • stagger delay (160 ms for right-column cards) applied via inline style
//   • card starts invisible (opacity:0) via  work-card-hidden  CSS class
//     (see index.css section marked [WORKSECTION CHANGE])
//   • Removed: wow-card-animate, work-card-stagger-1 class references
/**
 * WorkProjectCard Component
 * Triggers animate__fadeInUp from Animate.css once the card scrolls into view.
 * Right-column cards (odd index) get a 160 ms stagger delay.
 */
function WorkProjectCard({ project, index }) {
  const cardRef = useRef(null);
  // ── [WORKSECTION CHANGE] state now drives animate.css classes ──
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // reset so animation re-triggers on scroll back
        }
      },
      {
        root: null,
        // [WORKSECTION CHANGE] Staggered per-row rootMargin:
        //   Row 1 (index 0-1) → 650px: fires when "WORK" heading first appears (clouds visible, cards not yet)
        //   Row 2 (index 2-3) → 300px: fires mid-scroll into the section
        //   Row 3 (index 4-5) → 0px:   fires when card hits viewport edge
        rootMargin: `0px 0px ${index < 2 ? '650px' : index < 4 ? '300px' : '0px'} 0px`,
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── [WORKSECTION CHANGE] stagger delay for right-column cards ──
  const staggerStyle = index % 2 === 1 ? { animationDelay: '160ms' } : {};

  return (
    <a
      ref={cardRef}
      href={project.link || '#work'}
      // ── [WORKSECTION CHANGE] class list updated:
      //    • removed:  wow-card-animate  work-card-stagger-1  (old custom anim)
      //    • added:    work-card-hidden  (keeps card invisible before trigger)
      //                animate__animated + animate__fadeInUp  (when visible)
      className={`work-project-card group block bg-white overflow-hidden${isVisible
        ? ' animate__animated animate__fadeInUp'
        : ' work-card-hidden'
        }`}
      style={isVisible ? staggerStyle : {}}
      aria-label={`View ${project.title} project`}
    >
      {/* Project Preview Image */}
      <div className="work-image-container relative w-full aspect-[16/11] sm:aspect-[16/10] bg-[#eef2f5] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          className="h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Bottom Project Metadata Bar */}
      <div className="work-card-info flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 px-3 sm:px-4">
        {/* Box Heading in #092521 with fluid clamp */}
        <h3 className="work-card-title">
          {project.title}
        </h3>

        {/* Non-Clickable Tags with fluid clamp */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pointer-events-none">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="work-tag px-3 sm:px-3.5 py-1 sm:py-2.5 border border-[#092521]/40 select-none"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

/**
 * WorkSection Component
 * Displays selected projects on a Roman/Greek sky background card (work-bg.png).
 * - Full-width card layout (removed max-w-[1674px])
 * - Fluid typography scaling smoothly between minimum and maximum bounds
 * - animate__fadeInUp scroll reveal animation for every project card
 */
export default function WorkSection() {
  // ── [WORKSECTION CHANGE] load animate.css from CDN ──
  useAnimateCss();

  const headingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
        } else {
          setHeadingVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 350px 0px',
        threshold: 0.15,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      className="w-full px-4 sm:px-6 lg:px-[15px] my-4 relative z-10 select-none"
      aria-label="Our Work Portfolio"
    >
      <div
        className="work-card w-full mx-auto relative rounded-[24px] sm:rounded-[28px] md:rounded-[33px] overflow-hidden p-6 sm:p-10 md:p-14 lg:p-16"
      >
        {/* Main Section Heading with WOW bottom-to-top animation and fluid clamp */}
        <h2
          ref={headingRef}
          className={`work-heading mb-8 sm:mb-12 md:mb-14 wow-heading-animate ${headingVisible ? 'is-visible' : ''
            }`}
        >
          WORK
        </h2>

        {/* 2-Column Projects Grid — animate__fadeInUp scroll animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {workProjects.map((project, index) => (
            <WorkProjectCard
              key={`${project.id}-${index}`}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
