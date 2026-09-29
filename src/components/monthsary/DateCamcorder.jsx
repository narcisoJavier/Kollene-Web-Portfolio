import { useState, useRef } from "react";
import { camcorderVideos } from "../../data/monthsaryData";

export default function DateCamcorder() {
  const [activeClipId, setActiveClipId] = useState(camcorderVideos[0].id);
  const videoRef = useRef(null);

  const activeClip = camcorderVideos.find((c) => c.id === activeClipId) || camcorderVideos[0];

  const handleSelectClip = (clip) => {
    setActiveClipId(clip.id);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="camcorder-section" id="camcorder">
      <div className="section-intro">
        <span className="section-badge">Memories on Tape</span>
        <h3 className="section-heading">Our Date Camcorder & Vlogs</h3>
        <p className="section-subtext">
          Real videos of our dates, quiet walks, and our song. Captured under the city lights.
        </p>
      </div>

      <div className="camcorder-device">
        <div className="camcorder-bezel">
          {/* Camcorder HUD Overlay */}
          <div className="camcorder-hud">
            <div className="hud-top">
              <div className="hud-rec">
                <span className="rec-dot" />
                <span className="rec-text">REC</span>
              </div>
              <div className="hud-tape-status">SP &middot; HI-FI STEREO</div>
              <div className="hud-battery">
                <span>[ |||| ]</span>
              </div>
            </div>

            <div className="hud-bottom">
              <span className="hud-timestamp">SEP 30 2026 &middot; 22:30 PM</span>
              <span className="hud-title">{activeClip.title}</span>
            </div>
          </div>

          {/* HTML5 Video Screen */}
          <div className="camcorder-screen">
            <video
              ref={videoRef}
              key={activeClip.src}
              src={activeClip.src}
              poster={activeClip.poster}
              controls
              playsInline
              className="camcorder-video-player"
            />
          </div>
        </div>

        {/* Video Clip Tabs */}
        <div className="camcorder-tabs">
          <div className="tabs-header">SELECT MEMORY TAPE:</div>
          <div className="tabs-list">
            {camcorderVideos.map((clip) => {
              const isSelected = clip.id === activeClipId;
              return (
                <button
                  key={clip.id}
                  className={`clip-tab-btn ${isSelected ? "active" : ""}`}
                  onClick={() => handleSelectClip(clip)}
                >
                  <span className="clip-tab-icon">📼</span>
                  <div className="clip-tab-info">
                    <span className="clip-tab-title">{clip.title}</span>
                    <span className="clip-tab-meta">{clip.date} &middot; {clip.duration}</span>
                  </div>
                  {isSelected && <span className="now-playing-tag">PLAYING</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="camcorder-caption-box">
          <span className="caption-tape-badge">TAPE NOTE</span>
          <p className="caption-text">{activeClip.caption}</p>
        </div>
      </div>
    </div>
  );
}
