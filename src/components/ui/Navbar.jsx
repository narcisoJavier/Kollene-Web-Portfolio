import { useState, useEffect } from "react";

const navSections = [
  { id: "hero", label: "Overview" },
  { id: "projects", label: "3D CAD Works" },
  { id: "methodology", label: "Process" },
  { id: "academic", label: "Academic Research" },
  { id: "gallery", label: "Plates & Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }
];

export default function Navbar({ lenis }) {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const scrollPos = scrollY + 160;
      let current = "hero";

      for (let i = 0; i < navSections.length; i++) {
        const el = document.getElementById(navSections[i].id);
        if (el && scrollPos >= el.offsetTop) {
          current = navSections[i].id;
        }
      }
      setActive(current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToSection(id) {
    setMobileOpen(false);
    if (lenis && lenis.current) {
      lenis.current.scrollTo("#" + id, { offset: -60, duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollToSection("hero")}>
            <div>
              <span className="nav-logo-text">
                KOLLENE AIKA <span className="nav-logo-accent">LEYSON</span>
              </span>
              <span className="nav-logo-sub">Architecture Portfolio &middot; Mapúa Univ</span>
            </div>
          </div>

          <nav className="nav-links">
            {navSections.map(s => (
              <button
                key={s.id}
                className={`nav-link ${active === s.id ? "active" : ""}`}
                onClick={() => scrollToSection(s.id)}
              >
                {s.label}
                <span className="nav-indicator" />
              </button>
            ))}
          </nav>

          <div 
            className={`nav-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile navigation menu"
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>

      <div className={`nav-mobile-overlay ${mobileOpen ? "open" : ""}`}>
        {navSections.map(s => (
          <button
            key={s.id}
            className={`nav-mobile-link ${active === s.id ? "active" : ""}`}
            onClick={() => scrollToSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </>
  );
}
