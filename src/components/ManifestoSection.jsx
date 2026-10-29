import { useEffect, useRef, useState } from 'react';
import BoilingSketch from './BoilingSketch';

const redBgImg = '/assets/images/red-bg.png';
const leftHandImg = '/assets/images/left-hand.png';
const rightHandImg = '/assets/images/right-hand.png';

/**
 * ManifestoSection Component
 * Displays the core agency manifesto on a textured red cutting-mat card
 * framed by Michelangelo's Creation of Adam hands, with dynamic scroll-triggered
 * hand-drawn animated sketch loops around key terms that continue to move
 * continuously with 7 FPS line-boil matching atulkhola.com.
 */
export default function ManifestoSection() {
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
        threshold: 0.2,
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
      id="manifesto-section"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-[15px] mb-4 relative z-10 select-none"
      aria-label="Creative Philosophy Manifesto"
    >
      <div
        className="manifesto-card max-w-[1674px] mx-auto relative rounded-[24px] sm:rounded-[28px] md:rounded-[33px] overflow-hidden min-h-[380px] sm:min-h-[440px] md:min-h-[510px] flex items-center justify-center p-6 sm:p-10 md:p-16"
        style={{
          backgroundImage: `url(${redBgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#b91c1c',
        }}
      >
        {/* Decorative Renaissance Left Hand (Enters from Left, then continues floating) */}
        <div
          className={`manifesto-hand-left absolute top-0 pointer-events-none z-10 ${isInView ? 'is-entered' : ''
            }`}
          aria-hidden="true"
        >
          <div className="manifesto-hand-float-left">
            <img
              src={leftHandImg}
              alt="Artistic Renaissance left hand reaching toward manifesto"
              className="w-[170px] sm:w-[230px] md:w-[320px] lg:w-[370px] h-auto object-contain select-none"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>

        {/* Decorative Renaissance Right Hand (Enters from Right, then continues floating) */}
        <div
          className={`manifesto-hand-right absolute bottom-0 pointer-events-none z-10 ${isInView ? 'is-entered' : ''
            }`}
          aria-hidden="true"
        >
          <div className="manifesto-hand-float-right">
            <img
              src={rightHandImg}
              alt="Artistic Renaissance right hand pointing toward manifesto"
              className="w-[180px] sm:w-[240px] md:w-[330px] lg:w-[390px] h-auto object-contain select-none"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>

        {/* Central Manifesto Copy */}
        <div className="manifesto-content relative z-20 max-w-[1100px] mx-auto text-center px-4 sm:px-6">
          <h2 className="manifesto-title font-serif text-[#F9EED6] text-[28px] sm:text-[38px] md:text-[50px] lg:text-[62px] leading-[1.25] tracking-tight font-normal">
            <span className="block mb-2 md:mb-3">
              We don&apos;t just{' '}
              <BoilingSketch
                inView={isInView}
                delay={100}
                duration={480}
                fps={7}
                seed={108}
                color="#FFE100"
                strokeWidth={2.6}
              >
                make
              </BoilingSketch>{' '}
              things look good.
            </span>

            <span className="block">
              We make them mean{' '}
              <BoilingSketch
                inView={isInView}
                delay={320}
                duration={520}
                fps={7}
                seed={205}
                color="#FFE100"
                strokeWidth={2.6}
              >
                something.
              </BoilingSketch>
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
