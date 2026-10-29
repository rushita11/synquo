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
      className="w-full px-4 sm:px-6 lg:px-[15px] mb-28 md:mb-36 relative z-10 select-none"
      aria-label="Have something worth building call to action"
    >
      <div
        className="worth-building-card max-w-[1674px] mx-auto relative rounded-[24px] sm:rounded-[28px] md:rounded-[33px] overflow-hidden min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[615px] flex flex-col items-center justify-center pt-14 pb-14 px-6 sm:px-10"
      >
        <div
          className={`relative z-20 max-w-[1100px] mx-auto text-center flex flex-col items-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          <h2 className="font-serif text-[#601228] text-[36px] sm:text-[48px] md:text-[62px] lg:text-[76px] leading-[1.12] tracking-tight font-normal text-center mb-3 sm:mb-4">
            Have something worth building?
          </h2>
          <p className="text-[#601228] font-sans text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] leading-[1.5] max-w-[850px] text-center font-normal opacity-95 mb-7 sm:mb-9 px-2">
            Bring us the idea, the challenge, or even the question you haven&apos;t figured out yet.
            Let&apos;s find the right way forward.
          </p>
          <div className="cta-button-wrapper">
            <a
              id="worth-building-talk-btn"
              href="#book"
              className="inline-flex items-center justify-center bg-[#601228] hover:bg-[#4a0d1e] text-[#F9EED6] font-serif text-[18px] sm:text-[21px] px-8 sm:px-11 py-3 sm:py-3.5 transition-all duration-200 tracking-wide cursor-pointer"
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
