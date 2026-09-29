import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

// UI Components
import Navbar from "./components/ui/Navbar";
import PDFViewer from "./components/ui/PDFViewer";

// 3D Overlays
import ModelViewer from "./components/3d/ModelViewer";

// Page Sections (Portfolio Mode)
import Hero from "./components/sections/Hero";
import FeaturedProjects from "./components/sections/FeaturedProjects";
import DesignProcess from "./components/sections/DesignProcess";
import AcademicWork from "./components/sections/AcademicWork";
import Gallery from "./components/sections/Gallery";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";

// Monthsary Surprise Components
import MonthsaryView from "./components/monthsary/MonthsaryView";
import SurpriseEnvelopeModal from "./components/monthsary/SurpriseEnvelopeModal";

import "./App.css";

function App() {
  const lenisRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [viewerPdf, setViewerPdf] = useState(null);

  // View mode: 'monthsary' by default for the surprise, can switch to 'portfolio' anytime
  const [viewMode, setViewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("portfolio") || params.get("mode") === "portfolio") {
      return "portfolio";
    }
    return "monthsary";
  });

  // Wax envelope surprise modal on first entrance
  const [showEnvelopeModal, setShowEnvelopeModal] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("portfolio") || params.get("mode") === "portfolio") {
      return false;
    }
    const alreadyOpened = sessionStorage.getItem("monthsary-unsealed");
    return !alreadyOpened;
  });

  // Theme state: defaults to 'light' with option to switch to 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Only run Lenis in portfolio mode to prevent interfering with custom monthsary interactions
    if (viewMode !== "portfolio") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [viewMode]);

  // Lock scroll when full-screen 3D viewer or PDF is open
  useEffect(() => {
    if (activeProject || viewerPdf) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeProject, viewerPdf]);

  const handleOpenSurpriseFromModal = () => {
    sessionStorage.setItem("monthsary-unsealed", "true");
    setShowEnvelopeModal(false);
    setViewMode("monthsary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSkipModalToPortfolio = () => {
    setShowEnvelopeModal(false);
    setViewMode("portfolio");
  };

  return (
    <>
      <div className="noise-overlay" />

      {/* Surprise Wax Envelope Modal (appears on first entrance or when triggered) */}
      {showEnvelopeModal && (
        <SurpriseEnvelopeModal
          onOpenSurprise={handleOpenSurpriseFromModal}
          onClose={handleSkipModalToPortfolio}
        />
      )}

      {/* RENDER VIEW: MONTHSARY MODE */}
      {viewMode === "monthsary" && (
        <MonthsaryView
          onSwitchToPortfolio={() => {
            setViewMode("portfolio");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {/* RENDER VIEW: ARCHITECTURE PORTFOLIO MODE */}
      {viewMode === "portfolio" && (
        <>
          <Navbar 
            lenis={lenisRef} 
            theme={theme} 
            onToggleTheme={toggleTheme} 
            onOpenMonthsary={() => {
              setViewMode("monthsary");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          
          <main>
            <Hero theme={theme} />
            <FeaturedProjects onSelectProject={setActiveProject} />
            <DesignProcess />
            <AcademicWork onSelectPdf={setViewerPdf} />
            <Gallery onSelectPdf={setViewerPdf} />
            <About />
            <Contact />
          </main>

          {/* Floating quick shortcut button to jump back into the Monthsary surprise */}
          <button 
            className="floating-monthsary-trigger"
            onClick={() => {
              setViewMode("monthsary");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            title="Open Javier's Monthsary Surprise for Kollene"
          >
            <span className="floating-heart-icon">💖</span>
            <span>Surprise for Kollene ✨</span>
          </button>
        </>
      )}

      {/* 3D Model Viewer Overlay */}
      {activeProject && (
        <ModelViewer 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}

      {/* PDF Viewer Overlay */}
      {viewerPdf && (
        <PDFViewer 
          pdf={viewerPdf} 
          onClose={() => setViewerPdf(null)} 
        />
      )}
    </>
  );
}

export default App;
