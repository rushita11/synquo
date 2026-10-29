// const workBgImg = '/assets/images/work-bg.png';
const aminoImg = '/assets/images/amino.png';
const t3 = '/assets/images/t3.png';
const medallion = '/assets/images/Medallion.png';
const yourwai = '/assets/images/amino.png';
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
    id: 'glass',
    title: 'Glass',
    image: aminoImg,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },
  {
    id: 'glass',
    title: 'Glass',
    image: medallion,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },
  {
    id: 'glass',
    title: 'Glass',
    image: t3,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },
  {
    id: 'glass',
    title: 'Glass',
    image: yourwai,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },
  {
    id: 'glass',
    title: 'Glass',
    image: drillclub,
    link: '#work-glass',
    tags: ['Logo', 'Website', 'Branding'],
  },

];

/**
 * WorkSection Component
 * Displays selected projects on a Roman/Greek sky background card (work-bg.png).
 * - Main heading matches other section heading typography ("WORK")
 * - 2-column grid of projects wrapped inside <a> tags
 * - Box title in #092521 with 55px font size
 * - Non-clickable tag badges (Logo, Website, Branding)
 * - Section margin top and bottom strictly 4 (my-4)
 */
export default function WorkSection() {
  return (
    <section
      id="work"
      className="w-full px-4 sm:px-6 lg:px-[15px] my-4 relative z-10 select-none"
      aria-label="Our Work Portfolio"
    >
      <div
        className="work-card max-w-[1674px] mx-auto relative rounded-[24px] sm:rounded-[28px] md:rounded-[33px] overflow-hidden p-6 sm:p-10 md:p-14 lg:p-16"
      // style={{
      //   backgroundImage: `url(${workBgImg})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center top',
      //   backgroundColor: '#6BB2DC',
      // }}
      >
        {/* Main Section Heading */}
        <h2 className="font-serif text-[#092521] text-[36px] sm:text-[48px] md:text-[62px] lg:text-[76px] leading-[1.12] tracking-[0.06em] font-normal text-center uppercase mb-8 sm:mb-12 md:mb-14">
          WORK
        </h2>

        {/* 2-Column Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {workProjects.map((project, index) => (
            <a
              key={`${project.id}-${index}`}
              href={project.link || '#work'}
              className="work-project-card group block bg-white transition-all duration-300 transform overflow-hidden"
              aria-label={`View ${project.title} project`}
            >
              {/* Project Preview Image */}
              <div className="work-image-container relative w-full aspect-[16/11] sm:aspect-[16/10] bg-[#eef2f5] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              {/* Bottom Project Metadata Bar */}
              <div className="work-card-info flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 px-3">
                {/* Box Heading in #092521 at 55px */}
                <h3
                  className="font-serif text-[#092521] text-[36px] sm:text-[45px] md:text-[55px] leading-none font-normal tracking-tight"
                  style={{ color: '#092521', fontSize: 'clamp(34px, 4vw, 55px)' }}
                >
                  {project.title}
                </h3>

                {/* Non-Clickable Tags */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pointer-events-none">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 sm:px-3.5 py-1 sm:py-3 border border-[#092521]/40 text-[#092521] font-serif text-[20px] leading-tight select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
