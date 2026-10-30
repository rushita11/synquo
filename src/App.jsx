import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import LogoSliderSection from './components/LogoSliderSection';
import ManifestoSection from './components/ManifestoSection';
import WorkSection from './components/WorkSection';
import WorthBuildingSection from './components/WorthBuildingSection';
import ContactFaqSection from './components/contact/ContactFaqSection';
import FooterSection from './components/FooterSection';
import StickyBottomMenu from './components/StickyBottomMenu';
import { useSmoothScroll } from './hooks/useSmoothScroll';

/**
 * Main Application Component
 * Assembles LoadingScreen, HeroSection, LogoSliderSection, ManifestoSection,
 * WorkSection, WorthBuildingSection, ContactFaqSection, FooterSection, and sticky bottom navigation.
 */
export default function App() {
  // Global smooth scrolling matching prime.bharatesevakendra.com
  useSmoothScroll();
  const [screenLoadingDone, setScreenLoadingDone] = useState(false);

  return (
    <div className="site-wrapper">
      {/* Loading screen displaying only the green checks background */}
      <LoadingScreen
        minDuration={1400}
        onFinished={() => setScreenLoadingDone(true)}
      />

      {/* Main Content Area */}
      <main id="main-content">
        <HeroSection />
        <LogoSliderSection />
        <ManifestoSection />
        <WorkSection />
        <WorthBuildingSection />
        <ContactFaqSection />
        <FooterSection />
      </main>

      {/* Sticky Bottom Navigation for all sections */}
      <StickyBottomMenu screenLoadingDone={screenLoadingDone} />
    </div>
  );
}
