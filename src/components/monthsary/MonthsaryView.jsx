import { useState } from "react";
import HeartCanvas from "./HeartCanvas";
import RomanticAudio from "./RomanticAudio";
import LoveLetter from "./LoveLetter";
import BlueprintOfUs from "./BlueprintOfUs";
import DateCamcorder from "./DateCamcorder";
import PhotoboothReel from "./PhotoboothReel";
import DreamSanctuary from "./DreamSanctuary";
import MemoryScrapbook from "./MemoryScrapbook";
import LoveTokens from "./LoveTokens";
import { monthsaryConfig } from "../../data/monthsaryData";
import "./MonthsaryView.css";

export default function MonthsaryView({ onSwitchToPortfolio }) {
  const [particlesActive, setParticlesActive] = useState(true);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="monthsary-experience">
      <HeartCanvas active={particlesActive} />

      {/* Top Floating Utility Bar */}
      <header className="monthsary-header">
        <div className="monthsary-nav-inner">
          <div className="monthsary-brand">
            <span className="brand-heart">💖</span>
            <div className="brand-text">
              <span className="brand-title">KOLLENE & JAVIER</span>
              <span className="brand-sub">6th Monthsary &middot; Sept 30</span>
            </div>
          </div>

          <nav className="monthsary-quick-nav">
            <button onClick={() => scrollTo("love-letter")}>Letter</button>
            <button onClick={() => scrollTo("blueprint")}>6 Months</button>
            <button onClick={() => scrollTo("camcorder")}>Camcorder</button>
            <button onClick={() => scrollTo("photobooth")}>Photobooth</button>
            <button onClick={() => scrollTo("scrapbook")}>Scrapbook</button>
            <button onClick={() => scrollTo("sanctuary")}>Dream Home</button>
            <button onClick={() => scrollTo("tokens")}>Coupons</button>
          </nav>

          <div className="monthsary-header-actions">
            <RomanticAudio autoPlayTrigger={true} />

            <button 
              className="btn-toggle-particles"
              onClick={() => setParticlesActive(!particlesActive)}
              title={particlesActive ? "Pause floating petals" : "Resume floating petals"}
            >
              {particlesActive ? "🌸" : "🍂"}
            </button>

            <button 
              className="btn-view-portfolio"
              onClick={onSwitchToPortfolio}
              title="Switch to Kollene's Architecture Portfolio"
            >
              <span>📐 Portfolio Mode</span>
            </button>
          </div>
        </div>
      </header>

      {/* Romantic Hero Section */}
      <section className="monthsary-hero">
        <div className="hero-atmosphere" />
        <div className="container">
          <div className="monthsary-hero-content">
            <div className="hero-eyebrow-pill">
              <span className="sparkle">✨</span>
              <span>SPECIAL DEDICATION &middot; HAPPY 6TH MONTHSARY &middot; SEPTEMBER 30</span>
              <span className="sparkle">✨</span>
            </div>

            <h1 className="monthsary-hero-title">
              Happy 6th Monthsary, <br />
              <span className="hero-highlight-name">My Beautiful Motmot</span>
            </h1>

            <p className="monthsary-hero-tagline">
              {monthsaryConfig.tagline}
            </p>

            <div className="hero-quote-box">
              <p className="hero-quote-text">
                "{monthsaryConfig.heroQuote}"
              </p>
              <span className="hero-quote-author">— From Javier, with all my love</span>
            </div>

            <div className="hero-cta-buttons">
              <button 
                className="btn-hero-primary"
                onClick={() => scrollTo("love-letter")}
              >
                <span>Read Your Love Letter 💌</span>
              </button>
              <button 
                className="btn-hero-secondary"
                onClick={() => scrollTo("camcorder")}
              >
                <span>Watch Our Date Tapes 📹</span>
              </button>
              <button 
                className="btn-hero-secondary"
                onClick={() => scrollTo("photobooth")}
              >
                <span>Cuddle Photobooth 📸</span>
              </button>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>Scroll down for your surprise</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Main Sections */}
      <main className="monthsary-main container">
        <LoveLetter />
        <BlueprintOfUs />
        <DateCamcorder />
        <PhotoboothReel />
        <MemoryScrapbook />
        <DreamSanctuary />
        <LoveTokens />
      </main>

      {/* Romantic Footer */}
      <footer className="monthsary-footer">
        <div className="container">
          <div className="footer-heart-ring">
            <span>🤍</span>
          </div>
          <h3 className="footer-title">Forever & Always, My Motmot</h3>
          <p className="footer-text">
            Handcrafted with endless love by Narciso Javier for Kollene Aika Leyson.
          </p>
          <div className="footer-tags">
            <span>First Monthsary: April 30</span>
            <span>&middot;</span>
            <span>6th Monthsary: September 30</span>
            <span>&middot;</span>
            <span>To Infinity & Beyond</span>
          </div>

          <div className="footer-buttons">
            <button 
              className="btn-footer-portfolio"
              onClick={onSwitchToPortfolio}
            >
              <span>Return to Architecture Portfolio 📐</span>
            </button>
            <button 
              className="btn-footer-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>Back to Top 💖</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
