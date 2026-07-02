import { architectureProjects } from "../data/content";
import ProjectScene from "./ProjectScene";

export default function FeaturedProjects({ onSelectProject }) {
  return (
    <section id="projects" className="featured-projects">
      <div className="container">
        <div className="projects-header">
          <div className="section-label">Selected Works</div>
          <h2 className="section-title">Architectural CAD & 3D Models</h2>
          <p className="section-subtitle">
            Interactive digital models, spatial explorations, and climate-responsive architectural designs. Click any project to enter the immersive 3D viewer.
          </p>
        </div>

        <div className="project-showcase">
          {architectureProjects.map((project, idx) => {
            const isReverse = idx % 2 !== 0;
            return (
              <div 
                key={project.id} 
                className={`project-item visible ${isReverse ? "reverse" : ""}`}
              >
                {/* 3D Model Card */}
                <div 
                  className="project-model-card"
                  onClick={() => onSelectProject(project)}
                >
                  <ProjectScene
                    modelUrl={project.model || "/models/12.glb"}
                    scale={project.modelConfig?.scale || 1.1}
                    autoRotate={true}
                    interactive={false}
                    lightPreset="studio"
                  />
                  <div className="project-model-overlay">
                    <div className="project-model-hint">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                      <span>Interactive 3D Model</span>
                    </div>
                    <button className="explore-3d-btn">
                      Explore in 3D &rarr;
                    </button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-tag">{project.badge || project.category}</span>
                    <span className="project-year">{project.year} &middot; {project.location}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                      Design Concept
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                      {project.concept}
                    </div>
                  </div>

                  {project.stats && (
                    <div className="project-stats">
                      {project.stats.siteArea && (
                        <div className="stat-item">
                          <span className="stat-value">{project.stats.siteArea}</span>
                          <span className="stat-label">Site Area</span>
                        </div>
                      )}
                      {project.stats.structuralSystem && (
                        <div className="stat-item">
                          <span className="stat-value" style={{ color: "var(--accent)" }}>
                            {project.stats.structuralSystem.split("&")[0]}
                          </span>
                          <span className="stat-label">Structure</span>
                        </div>
                      )}
                      {project.stats.passiveStrategy && (
                        <div className="stat-item">
                          <span className="stat-value">{project.stats.passiveStrategy.split("&")[0]}</span>
                          <span className="stat-label">Strategy</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="project-cta">
                    <button 
                      className="btn btn-primary"
                      onClick={() => onSelectProject(project)}
                    >
                      Launch 3D Explorer
                    </button>
                    <button 
                      className="btn btn-outline"
                      onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      View Plates & Drawings
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
