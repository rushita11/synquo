import ArtifactImage from './ArtifactImage';

const claySealImg = '/assets/images/clay-seal.png';
const stoneFragmentImg = '/assets/images/stone-fragment.png';
const bronzeCoinImg = '/assets/images/bronze-coin.png';
const goldStampImg = '/assets/images/gold-stamp.png';

/**
 * HeroSection component
 * Features deep green cutting-mat grid background, continuous physics-inspired floating artifacts,
 * centralized luxury serif headline (using CSS variable --font-size-heading), and cream CTA button.
 */
export default function HeroSection() {
  return (
    <section 
      id="hero-section" 
      className="hero-wrapper"
      aria-label="Hero Section"
    >
      <div className="hero-canvas green-checks-bg">
        {/* Floating Artifact 1: Ancient Clay Carved Seal (Top Center) */}
        <div 
          className="artifact-seal continuous-anim" 
          aria-hidden="true"
        >
          <ArtifactImage
            id="hero-seal-artifact"
            src={claySealImg}
            alt="Ancient terracotta carved seal with quill and serpent motif"
          />
        </div>

        {/* Floating Artifact 2: Ancient Stone Slab (Left) */}
        <div 
          className="artifact-stone continuous-anim" 
          aria-hidden="true"
        >
          <ArtifactImage
            id="hero-stone-artifact"
            src={stoneFragmentImg}
            alt="Ancient weathered stone slab fragment with radiating carved symbol"
          />
        </div>

        {/* Central Content */}
        <div className="hero-content">
          <h1 id="main-hero-heading" className="main-heading hero-heading-animated">
            High-Converting Design<br />
            For Ambitious Brands
          </h1>

          <div className="hero-cta-container">
            <a 
              id="hero-book-call-btn" 
              href="#book" 
              className="btn-cta"
              role="button"
            >
              Book a call now
            </a>
          </div>
        </div>

        {/* Floating Artifact 3: Antique Bronze Coin (Bottom Left) */}
        <div 
          className="artifact-coin continuous-anim" 
          aria-hidden="true"
        >
          <ArtifactImage
            id="hero-coin-artifact"
            src={bronzeCoinImg}
            alt="Antique Roman bronze medallion coin"
          />
        </div>

        {/* Floating Artifact 4: Gold Experience Stamp (Bottom Right) */}
        <div 
          className="artifact-stamp continuous-anim" 
          aria-hidden="true"
        >
          <ArtifactImage
            id="hero-stamp-artifact"
            src={goldStampImg}
            alt="Luxury gold foil postage stamp with 9 years of experience"
          />
        </div>
      </div>
    </section>
  );
}
