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

export default function Navbar({ lenis, theme = "light", onToggleTheme }) {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

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
          {/* Left-Aligned Brand Logo */}
          <div className="nav-logo" onClick={() => scrollToSection("hero")}>
            <div className="nav-logo-mark">
              <span>KA</span>
            </div>
            <div className="nav-logo-text-group">
              <span className="nav-logo-text">
                KOLLENE AIKA <span className="nav-logo-accent">LEYSON</span>
              </span>
              <span className="nav-logo-sub">BS Architecture &middot; Mapúa Univ</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            {navSections.map((s) => (
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

          {/* Right Action Utilities (Theme Switcher & Mobile Menu) */}
          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "Dark Theme" : "Light Theme"}`}
            >
              {theme === "light" ? (
                // Moon icon to switch to Dark
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                // Sun icon to switch to Light
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

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
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`nav-mobile-overlay ${mobileOpen ? "open" : ""}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "320px", marginBottom: "20px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Theme: {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
          <button className="theme-toggle-btn" onClick={onToggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        {navSections.map((s) => (
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
