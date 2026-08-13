import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

// UI Components
import Navbar from "./components/ui/Navbar";
import PDFViewer from "./components/ui/PDFViewer";

// 3D Overlays
import ModelViewer from "./components/3d/ModelViewer";

// Page Sections
import Hero from "./components/sections/Hero";
import FeaturedProjects from "./components/sections/FeaturedProjects";
import DesignProcess from "./components/sections/DesignProcess";
import AcademicWork from "./components/sections/AcademicWork";
import Gallery from "./components/sections/Gallery";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";

import "./App.css";

function App() {
  const lenisRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [viewerPdf, setViewerPdf] = useState(null);

  // Theme state: defaults to 'light' (as requested) with option to switch to 'dark'
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
  }, []);

  // Lock scroll when full-screen 3D viewer or PDF is open
  useEffect(() => {
    if (activeProject || viewerPdf) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeProject, viewerPdf]);

  return (
    <>
      <div className="noise-overlay" />
      <Navbar 
        lenis={lenisRef} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
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

      {activeProject && (
        <ModelViewer 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}

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
