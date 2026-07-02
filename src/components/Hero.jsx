import { profile } from "../data/content";
import ThreeBackground from "./ThreeBackground";

export default function Hero() {
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <ThreeBackground />

      <div className="hero-content">
        <p className="hero-eyebrow">
          Mapúa University &middot; BS Architecture Portfolio
        </p>

        <h1 className="hero-name">
          KOLLENE AIKA <span className="accent">LEYSON</span>
        </h1>

        <p className="hero-tagline">
          {profile.tagline}
        </p>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
          <span className="project-tag" style={{ background: "rgba(212,165,116,0.1)" }}>
            3D CAD & Digital Craft
          </span>
          <span className="project-tag" style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--border)" }}>
            Tropical Resilience
          </span>
          <span className="project-tag" style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--border)" }}>
            Filipino Vernacular
          </span>
        </div>

        <div className="hero-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => scrollTo("projects")}
          >
            Explore 3D Models &rarr;
          </button>
          <button 
            className="btn btn-outline" 
            onClick={() => scrollTo("about")}
          >
            Architectural Profile
          </button>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll to Explore</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
