import { designProcessSteps } from "../data/content";

export default function DesignProcess() {
  return (
    <section id="methodology" className="design-process">
      <div className="container">
        <div className="section-label">Design Methodology</div>
        <h2 className="section-title">From Contextual Narrative to 3D Tectonics</h2>
        <p className="section-subtitle">
          Every spatial concept is refined through a rigorous four-stage architectural workflow integrating climatic analysis, volumetric massing, and parametric CAD craft.
        </p>

        <div className="process-steps">
          {designProcessSteps.map((step) => (
            <div key={step.number} className="process-step visible">
              <div className="process-step-number">{step.number}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                {step.phase}
              </div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.description}</p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "20px" }}>
                {step.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    style={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-muted)",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border)",
                      padding: "3px 8px",
                      borderRadius: "6px"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
