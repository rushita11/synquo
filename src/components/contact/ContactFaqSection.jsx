import FaqAccordion from './FaqAccordion';
import ContactForm from './ContactForm';

/**
 * ContactFaqSection Component
 * Main section housing the 2-column split layout:
 * - Left Column: FAQ Accordion ("A Few Things to Know.")
 * - Right Column: Contact Inquiry Form ("Let's Make Your Idea Real.")
 * Built with Formik, Yup, modular helpers, and matching the site's max width and rounded corner design.
 */
export default function ContactFaqSection() {
  return (
    <section
      id="book"
      className="w-full px-4 sm:px-6 lg:px-[15px] my-4 relative z-10"
      aria-label="FAQ and Contact Inquiry"
    >
      <div className="contact-faq-card max-w-[1674px] mx-auto relative rounded-[24px] sm:rounded-[28px] md:rounded-[33px] overflow-hidden shadow-2xl border border-black/5 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#092521]/10">
        {/* Left Column: FAQ Accordion */}
        <div className="w-full">
          <FaqAccordion />
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
