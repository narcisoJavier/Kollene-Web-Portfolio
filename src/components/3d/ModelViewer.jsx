import { useState, useEffect, useRef, useCallback } from "react";
import ProjectScene from "./ProjectScene";

export default function ModelViewer({ project, onClose }) {
  // Navigation & Traversal Mode
  const [traversalMode, setTraversalMode] = useState("orbit"); // 'orbit' | 'creative'
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [flashlight, setFlashlight] = useState(false);
  const [showFlatLand, setShowFlatLand] = useState(true);
  const [showSunPath, setShowSunPath] = useState(true);

  // Sun Path & Solar Simulation State
  const [timeOfDay, setTimeOfDay] = useState(13.5); // 1:30 PM default
  const [isSunPlaying, setIsSunPlaying] = useState(false);
  const [solarInfo, setSolarInfo] = useState({ altitudeDeg: 62, azimuthDeg: 195 });

  // Camera & HUD stats
  const [hudStats, setHudStats] = useState({ x: "4.5", y: "3.2", z: "5.5", headingDeg: 215, compass: "SW" });
  const [cameraPosition, setCameraPosition] = useState([4.5, 3.2, 5.5]);
  const [key, setKey] = useState(0);

  // Mobile / Virtual Joystick State
  const [virtualMove, setVirtualMove] = useState({ x: 0, y: 0 });
  const [virtualElevate, setVirtualElevate] = useState(0);

  // Animation frame for playing sun cycle
  useEffect(() => {
    if (!isSunPlaying) return;

    const interval = setInterval(() => {
      setTimeOfDay((prev) => {
        const next = prev + 0.08;
        return next > 24 ? 0 : next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isSunPlaying]);

  // Keyboard shortcut listener (Escape to close, F for flashlight, M for mode)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.code === "KeyF" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        setFlashlight((prev) => !prev);
      } else if (e.code === "KeyM" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        setTraversalMode((prev) => (prev === "orbit" ? "creative" : "orbit"));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Format time of day into 12-hour AM/PM string
  const formatTime = (hoursFloat) => {
    const totalMinutes = Math.floor(hoursFloat * 60);
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHours}:${displayMinutes} ${period}`;
  };

  // Solar presets
  const solarPresets = [
    { label: "Dawn", time: 6.5, icon: "🌅" },
    { label: "Morning", time: 9.5, icon: "☀️" },
    { label: "Noon", time: 12.0, icon: "🔆" },
    { label: "Golden Hour", time: 17.5, icon: "🌇" },
    { label: "Twilight", time: 19.0, icon: "🌆" },
    { label: "Night", time: 22.5, icon: "🌌" }
  ];

  // Camera presets
  const setCameraPreset = (preset) => {
    if (preset === "eye-level") {
      setCameraPosition([3.2, 1.7, 4.2]);
    } else if (preset === "aerial") {
      setCameraPosition([14, 18, 16]);
    } else if (preset === "facade") {
      setCameraPosition([0, 2.0, 7.0]);
    } else {
      setCameraPosition([4.5, 3.2, 5.5]);
    }
    setKey((prev) => prev + 1);
  };

  if (!project) return null;

  return (
    <div className="model-viewer-overlay">
      {/* Top Bar / Close Button */}
      <button 
        className="model-viewer-close" 
        onClick={onClose} 
        aria-label="Close 3D Viewer"
        title="Close Viewer (Esc)"
      >
        ✕
      </button>

      {/* Top Header Mode Switcher Tabs */}
      <div className="viewer-mode-bar glass-card">
        <button
          className={`viewer-mode-tab ${traversalMode === "orbit" ? "active" : ""}`}
          onClick={() => setTraversalMode("orbit")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <span>Orbit Inspect</span>
        </button>

        <button
          className={`viewer-mode-tab ${traversalMode === "creative" ? "active" : ""}`}
          onClick={() => setTraversalMode("creative")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
          <span>Creative Mode (WASD)</span>
        </button>
      </div>

      {/* Project Information Panel */}
      <div className="model-viewer-info glass-card">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span className="project-tag">{project.badge || "3D CAD"}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            {project.year} &middot; {project.location}
          </span>
        </div>
        <h2>{project.title}</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.5", marginBottom: "12px" }}>
          {project.concept}
        </p>

        {project.stats && (
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
            {project.stats.siteArea && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Site Area</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{project.stats.siteArea}</span>
              </div>
            )}
            {project.stats.structuralSystem && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Structure</span>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>{project.stats.structuralSystem}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Traversal HUD (Active in Creative Mode) */}
      {traversalMode === "creative" && (
        <div className="creative-hud glass-card">
          <div className="hud-title">
            <span className="hud-pulse" />
            <span>Creative Flight Traversal</span>
          </div>

          <div className="hud-stats-grid">
            <div className="hud-stat">
              <span className="hud-label">Altitude (Y)</span>
              <span className="hud-value">{hudStats.y}m</span>
            </div>
            <div className="hud-stat">
              <span className="hud-label">Position (X, Z)</span>
              <span className="hud-value">{hudStats.x}, {hudStats.z}</span>
            </div>
            <div className="hud-stat">
              <span className="hud-label">Heading</span>
              <span className="hud-value">{hudStats.headingDeg}&deg; {hudStats.compass}</span>
            </div>
          </div>

          {/* Speed Selection */}
          <div className="hud-row" style={{ marginTop: "10px" }}>
            <span className="hud-label">Speed:</span>
            <div className="hud-btn-group">
              {[1, 2, 4].map((s) => (
                <button
                  key={s}
                  className={`hud-mini-btn ${speedMultiplier === s ? "active" : ""}`}
                  onClick={() => setSpeedMultiplier(s)}
                >
                  {s === 1 ? "1x Walk" : s === 2 ? "2x Jog" : "4x Fly"}
                </button>
              ))}
            </div>
          </div>

          {/* Flashlight Toggle */}
          <div className="hud-row" style={{ marginTop: "8px" }}>
            <button
              className={`hud-tool-btn ${flashlight ? "active" : ""}`}
              onClick={() => setFlashlight(!flashlight)}
              title="Toggle Flashlight / Spotlight (F key)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>{flashlight ? "Flashlight [ON]" : "Flashlight [OFF] (F)"}</span>
            </button>
          </div>

          {/* Key Bindings Help */}
          <div className="hud-key-help">
            <span><strong>W A S D</strong> Walk/Fly</span> &bull; <span><strong>Space/Shift</strong> Up/Down</span> &bull; <span><strong>Drag</strong> 360&deg; Look</span>
          </div>
        </div>
      )}

      {/* 3D Canvas Viewport */}
      <div className="model-viewer-canvas">
        <ProjectScene
          key={key}
          modelUrl={project.model || "/models/12.glb"}
          scale={project.modelConfig?.scale || 1.15}
          interactive={true}
          traversalMode={traversalMode}
          timeOfDay={timeOfDay}
          showSunPath={showSunPath}
          showFlatLand={showFlatLand}
          flashlight={flashlight}
          speedMultiplier={speedMultiplier}
          virtualMove={virtualMove}
          virtualElevate={virtualElevate}
          onUpdateStats={setHudStats}
          cameraPosition={cameraPosition}
        />
      </div>

      {/* Mobile Touch Joystick & Elevation Controls */}
      {traversalMode === "creative" && (
        <div className="mobile-traversal-controls">
          <div className="mobile-dpad">
            <button
              className="dpad-btn up"
              onPointerDown={() => setVirtualMove((v) => ({ ...v, y: 1 }))}
              onPointerUp={() => setVirtualMove((v) => ({ ...v, y: 0 }))}
            >
              ▲
            </button>
            <div className="dpad-middle">
              <button
                className="dpad-btn left"
                onPointerDown={() => setVirtualMove((v) => ({ ...v, x: -1 }))}
                onPointerUp={() => setVirtualMove((v) => ({ ...v, x: 0 }))}
              >
                ◀
              </button>
              <div className="dpad-center" />
              <button
                className="dpad-btn right"
                onPointerDown={() => setVirtualMove((v) => ({ ...v, x: 1 }))}
                onPointerUp={() => setVirtualMove((v) => ({ ...v, x: 0 }))}
              >
                ▶
              </button>
            </div>
            <button
              className="dpad-btn down"
              onPointerDown={() => setVirtualMove((v) => ({ ...v, y: -1 }))}
              onPointerUp={() => setVirtualMove((v) => ({ ...v, y: 0 }))}
            >
              ▼
            </button>
          </div>

          <div className="mobile-elevation-btns">
            <button
              className="elevate-btn"
              onPointerDown={() => setVirtualElevate(1)}
              onPointerUp={() => setVirtualElevate(0)}
            >
              UP
            </button>
            <button
              className="elevate-btn"
              onPointerDown={() => setVirtualElevate(-1)}
              onPointerUp={() => setVirtualElevate(0)}
            >
              DN
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Control Center (Sun Path, Daylight, Terrain & Viewpoints) */}
      <div className="viewer-bottom-bar glass-card">
        {/* Sun Path & Time of Day Controller */}
        <div className="sunpath-controller">
          <div className="sunpath-header">
            <div className="sunpath-time-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <span>Sun Path: <strong>{formatTime(timeOfDay)}</strong></span>
            </div>

            <button
              className={`sun-play-btn ${isSunPlaying ? "playing" : ""}`}
              onClick={() => setIsSunPlaying(!isSunPlaying)}
              title={isSunPlaying ? "Pause Sun Cycle" : "Play Animated Sun Cycle"}
            >
              {isSunPlaying ? "❚❚ Pause" : "▶ Play Sun Arc"}
            </button>
          </div>

          {/* Time Slider */}
          <div className="sunpath-slider-wrapper">
            <span className="slider-edge-label">06:00</span>
            <input
              type="range"
              min="0"
              max="24"
              step="0.1"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
              className="sunpath-range-slider"
            />
            <span className="slider-edge-label">24:00</span>
          </div>

          {/* Quick Presets */}
          <div className="sunpath-presets">
            {solarPresets.map((p) => (
              <button
                key={p.label}
                className={`sun-preset-chip ${Math.abs(timeOfDay - p.time) < 0.8 ? "active" : ""}`}
                onClick={() => {
                  setTimeOfDay(p.time);
                  setIsSunPlaying(false);
                }}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Viewpoint & Environment Toggles */}
        <div className="viewer-actions-row">
          {/* Camera View Presets */}
          <div className="view-presets-group">
            <button className="viewer-action-btn" onClick={() => setCameraPreset("facade")} title="Front Elevation View">
              Facade
            </button>
            <button className="viewer-action-btn" onClick={() => setCameraPreset("eye-level")} title="Ground Human Scale (1.7m)">
              Eye Level
            </button>
            <button className="viewer-action-btn" onClick={() => setCameraPreset("aerial")} title="Site Aerial Overview">
              Aerial
            </button>
          </div>

          <div className="viewer-toggles-group">
            <button
              className={`viewer-action-btn ${showFlatLand ? "active" : ""}`}
              onClick={() => setShowFlatLand(!showFlatLand)}
              title="Toggle Simulated Flat Land Terrain"
            >
              🌱 Flat Land: {showFlatLand ? "ON" : "OFF"}
            </button>

            <button
              className={`viewer-action-btn ${showSunPath ? "active" : ""}`}
              onClick={() => setShowSunPath(!showSunPath)}
              title="Toggle 3D Sun Path Celestial Arc"
            >
              ☀️ Sun Arc: {showSunPath ? "ON" : "OFF"}
            </button>

            <button
              className="viewer-action-btn"
              onClick={() => {
                setCameraPreset("default");
                setKey((prev) => prev + 1);
              }}
              title="Reset Viewpoint"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
