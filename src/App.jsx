import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";
import DesignProcess from "./components/DesignProcess";
import AcademicWork from "./components/AcademicWork";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import ModelViewer from "./components/ModelViewer";
import PDFViewer from "./components/PDFViewer";
import "./App.css";

function App() {
  const lenisRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [viewerPdf, setViewerPdf] = useState(null);

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
      <Navbar lenis={lenisRef} />
      <main>
        <Hero />
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
