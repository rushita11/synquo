import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const rawLogos = [
  { id: 'molecule', name: 'Molecule', src: '/assets/images/molecule.png' },
  { id: 'tenderhub', name: 'Tenderhub', src: '/assets/images/tenderhub.png' },
  { id: 'yourwai', name: 'YOURWAi', src: '/assets/images/yourwai.png' },
  { id: 'secondlane', name: 'SecondLane', src: '/assets/images/secondlane.png' },
  { id: 'omino', name: 'Amino Club', src: '/assets/images/omino.png' },
  { id: 'glass', name: 'Glass', src: '/assets/images/glass.png' },
  { id: 'medallian', name: 'Medallion', src: '/assets/images/medallian.png' },
  { id: 'shade', name: 'Shade', src: '/assets/images/shade.svg' },
];

// Duplicate logos array to guarantee seamless continuous infinite loop across all resolutions
const sliderLogos = [...rawLogos, ...rawLogos, ...rawLogos, ...rawLogos];

/**
 * LogoSliderSection
 * Displays trusted partner & client logos in a smooth continuous marquee slider
 * utilizing Swiper library with #F4F2D9 background, pausing on hover without image hover effects.
 */
export default function LogoSliderSection() {
  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <section
      id="clients-logo-section"
      className="w-full px-4 sm:px-6 lg:px-[15px] mt-4 mb-4 relative z-10"
      aria-label="Partner & Client Logos"
    >
      <div
        className="max-w-[1674px] mx-auto clients-slider-wrapper bg-[#F4F2D9] py-4 md:py-6 px-4 md:px-8 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          modules={[Autoplay, FreeMode]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView="auto"
          spaceBetween={40}
          loop={true}
          speed={3500}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={true}
          breakpoints={{
            320: {
              spaceBetween: 28,
            },
            640: {
              spaceBetween: 36,
            },
            1024: {
              spaceBetween: 52,
            },
          }}
          className="clients-swiper"
        >
          {sliderLogos.map((logo, index) => (
            <SwiperSlide key={`${logo.id}-${index}`} className="!w-auto flex items-center justify-center">
              <div className="flex items-center justify-center px-2 py-1 select-none">
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="client-logo-img h-7 sm:h-8 md:h-9 w-auto  object-contain select-none pointer-events-none"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
