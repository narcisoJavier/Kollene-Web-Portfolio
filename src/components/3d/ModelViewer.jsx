import { useState, useEffect } from "react";
import ProjectScene from "./ProjectScene";

export default function ModelViewer({ project, onClose }) {
  const [lightPreset, setLightPreset] = useState("studio");
  const [autoRotate, setAutoRotate] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="model-viewer-overlay">
      <button 
        className="model-viewer-close" 
        onClick={onClose} 
        aria-label="Close 3D Viewer"
      >
        ✕
      </button>

      <div className="model-viewer-info glass-card" style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span className="project-tag">{project.badge || "3D Model"}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            {project.year}
          </span>
        </div>
        <h2>{project.title}</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>
          {project.location}
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
          {project.concept}
        </p>

        {project.stats && (
          <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "6px" }}>
            {project.stats.siteArea && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Site Area</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{project.stats.siteArea}</span>
              </div>
            )}
            {project.stats.structuralSystem && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Structure</span>
                <span style={{ color: "var(--accent)", fontWeight: 500 }}>{project.stats.structuralSystem}</span>
              </div>
            )}
            {project.stats.passiveStrategy && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Passive Strategy</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{project.stats.passiveStrategy}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="model-viewer-canvas">
        <ProjectScene
          key={key}
          modelUrl={project.model || "/models/12.glb"}
          scale={project.modelConfig?.scale || 1.2}
          interactive={true}
          autoRotate={autoRotate}
          lightPreset={lightPreset}
        />
      </div>

      <div className="model-viewer-controls">
        <button
          className={`viewer-ctrl-btn ${lightPreset === "studio" ? "active" : ""}`}
          onClick={() => setLightPreset("studio")}
        >
          Studio Light
        </button>
        <button
          className={`viewer-ctrl-btn ${lightPreset === "sunset" ? "active" : ""}`}
          onClick={() => setLightPreset("sunset")}
        >
          Sunset Warm
        </button>
        <button
          className={`viewer-ctrl-btn ${lightPreset === "night" ? "active" : ""}`}
          onClick={() => setLightPreset("night")}
        >
          Night Glow
        </button>
        <button
          className={`viewer-ctrl-btn ${autoRotate ? "active" : ""}`}
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate ? "Pause Spin" : "Auto Rotate"}
        </button>
        <button
          className="viewer-ctrl-btn"
          onClick={() => setKey(prev => prev + 1)}
          title="Reset Camera Position"
        >
          Reset View
        </button>
      </div>
    </div>
  );
}
