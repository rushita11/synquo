import { useEffect, useRef, useState } from 'react';

/**
 * WorthBuildingSection Component
 * "Have something worth building?" call-to-action section with panoramic mountain landscape,
 * deep burgundy (#601228) typography, and matching "Let's Talk" CTA button.
 * Matches container padding, border radius, and spacing of other sections.
 */
export default function WorthBuildingSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="talk-section"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-[15px] mb-4 relative z-10 select-none"
      aria-label="Have something worth building call to action"
    >
      <div
        className="worth-building-card w-full mx-auto relative rounded-[24px] sm:rounded-[28px] md:rounded-[33px] overflow-hidden min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[615px] flex flex-col items-center justify-center pt-14 pb-14 px-6 sm:px-10"
      >
        <div
          className={`relative z-20 max-w-[1250px] w-full mx-auto text-center flex flex-col items-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          <h2 className="worth-building-heading mb-3 sm:mb-4">
            Have something worth building?
          </h2>
          <p className="worth-building-desc max-w-[850px] font-normal opacity-95 mb-7 sm:mb-9 px-2">
            Bring us the idea, the challenge, or even the question you haven&apos;t figured out yet.
            Let&apos;s find the right way forward.
          </p>
          <div className="cta-button-wrapper">
            <a
              id="worth-building-talk-btn"
              href="#book"
              className="worth-building-btn inline-flex items-center justify-center bg-[#601228] hover:bg-[#4a0d1e] text-[#F9EED6] px-8 sm:px-11 py-3 sm:py-3.5 transition-all duration-200 cursor-pointer"
              role="button"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
