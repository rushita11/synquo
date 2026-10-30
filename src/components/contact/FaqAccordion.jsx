import { useState } from 'react';

const plusImg = '/assets/images/plus.png';
const minusImg = '/assets/images/minus.svg';

const FAQ_ITEMS = [
  {
    id: '01',
    number: '01.',
    question: 'How does the project process work?',
    answer:
      'We discuss your goals, agree on the scope, share designs for feedback, and refine the final direction.',
  },
  {
    id: '02',
    number: '02.',
    question: "What if I don't like the design?",
    answer:
      'We iterate closely with clear checkpoints, moodboards, and open communication until the aesthetic and conversion goals match your vision.',
  },
  {
    id: '03',
    number: '03.',
    question: 'How long will my project take?',
    answer:
      'Most branding and website sprints take between 2 to 6 weeks, depending on scope, revision cycles, and technical depth.',
  },
  {
    id: '04',
    number: '04.',
    question: 'Will I receive my project files?',
    answer:
      'Yes, you receive 100% full ownership of all source design files (Figma systems, vectors, assets) and production code repositories.',
  },
  {
    id: '05',
    number: '05.',
    question: 'What do you need from me to get started?',
    answer:
      'A brief summary of your core offering, business targets, reference sites or brands you admire, and any existing materials or brand guidelines.',
  },
  {
    id: '06',
    number: '06.',
    question: 'Do you offer refunds?',
    answer:
      'We structure agreements with milestone-based progress deliverables, ensuring you only fund work you have reviewed and approved.',
  },
];

/**
 * FaqAccordion Component
 * Left column displaying the "A Few Things to Know." accordion matching the reference layout.
 */
export default function FaqAccordion() {
  // First item open by default as shown in the reference screenshot
  const [openId, setOpenId] = useState('01');

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faq-accordion-wrapper w-full h-full bg-[#FAF6EE] p-7 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-start select-none">
      {/* Column Heading with fluid clamp */}
      <h2 className="contact-faq-heading mb-8 sm:mb-12">
        A Few Things to Know.
      </h2>
      <div className="faq-list flex flex-col">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="faq-item border-b border-[#092521]/15 py-4 sm:py-5 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <span className="faq-question-num">
                    {item.number}
                  </span>
                  <span className="faq-question-text group-hover:opacity-85 transition-opacity">
                    {item.question}
                  </span>
                </div>

                <span
                  className="shrink-0 ml-2 flex items-center justify-center select-none"
                  aria-hidden="true"
                >
                  <img
                    src={isOpen ? minusImg : plusImg}
                    alt={isOpen ? 'Collapse answer' : 'Expand answer'}
                    className="w-[15px] h-[15px] sm:w-[18px] sm:h-[18px] object-contain transition-transform duration-200"
                    draggable={false}
                  />
                </span>
              </button>

              {/* Collapsible Answer */}
              <div
                id={`faq-answer-${item.id}`}
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2 sm:mt-3' : 'grid-rows-[0fr] opacity-0'
                  }`}
              >
                <div className="overflow-hidden">
                  <p className="faq-answer-text pr-6 sm:pr-8">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
