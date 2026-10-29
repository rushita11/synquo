import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import LogoSliderSection from './components/LogoSliderSection';
import ManifestoSection from './components/ManifestoSection';
import WorkSection from './components/WorkSection';
import WorthBuildingSection from './components/WorthBuildingSection';
import ContactFaqSection from './components/contact/ContactFaqSection';
import StickyBottomMenu from './components/StickyBottomMenu';

/**
 * Main Application Component
 * Assembles LoadingScreen, HeroSection, LogoSliderSection, ManifestoSection,
 * WorkSection, WorthBuildingSection, ContactFaqSection, and sticky bottom navigation.
 */
export default function App() {
  return (
    <div className="site-wrapper">
      {/* Loading screen displaying only the green checks background */}
      <LoadingScreen minDuration={1400} />

      {/* Main Content Area */}
      <main id="main-content">
        <HeroSection />
        <LogoSliderSection />
        <ManifestoSection />
        <WorkSection />
        <WorthBuildingSection />
        <ContactFaqSection />
      </main>

      {/* Sticky Bottom Navigation for all sections */}
      <StickyBottomMenu />
    </div>
  );
}
