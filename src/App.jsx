import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import StickyBottomMenu from './components/StickyBottomMenu';

/**
 * Main Application Component
 * Assembles LoadingScreen, HeroSection, and sticky bottom navigation.
 */
export default function App() {
  return (
    <div className="site-wrapper">
      {/* Loading screen displaying only the green checks background */}
      <LoadingScreen minDuration={1400} />

      {/* Main Content Area */}
      <main id="main-content">
        <HeroSection />
        {/* Additional sections can be added here in the future */}
      </main>

      {/* Sticky Bottom Navigation for all sections */}
      <StickyBottomMenu />
    </div>
  );
}
