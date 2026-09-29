import { useState } from "react";
import { photoboothPoses } from "../../data/monthsaryData";

export default function PhotoboothReel() {
  const [startIndex, setStartIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const posesCount = photoboothPoses.length;

  const nextPoses = () => {
    setFlash(true);
    setTimeout(() => {
      setStartIndex((prev) => (prev + 3) % posesCount);
      setFlash(false);
    }, 250);
  };

  // Get current 4 frames
  const currentFrames = [
    photoboothPoses[(startIndex) % posesCount],
    photoboothPoses[(startIndex + 1) % posesCount],
    photoboothPoses[(startIndex + 2) % posesCount],
    photoboothPoses[(startIndex + 3) % posesCount]
  ];

  return (
    <div className="photobooth-section" id="photobooth">
      <div className="section-intro">
        <span className="section-badge">Authentic Us &middot; Zero Filter</span>
        <h3 className="section-heading">Our Bedtime Cuddle Photobooth</h3>
        <p className="section-subtext">
          No filters, no posing — just our raw, silly, hilarious, and happiest cuddle faces together.
        </p>
      </div>

      <div className="photobooth-controls">
        <button 
          className="btn-photobooth-shuffle"
          onClick={nextPoses}
          title="Shuffle to next batch of photos"
        >
          <span className="camera-icon">📸</span>
          <span>Next Pose Reel &middot; Shuffle Poses</span>
          <span className="counter-pill">{((startIndex / 3) % 4) + 1}/4</span>
        </button>
      </div>

      <div className="photobooth-wrapper">
        <div className={`photobooth-strip ${flash ? "flash-active" : ""}`}>
          <div className="strip-header">
            <span className="strip-title">JAVIER ♥ KOLLENE</span>
            <span className="strip-date">09.30 &middot; 6TH MONTHSARY</span>
          </div>

          <div className="strip-frames-grid">
            {currentFrames.map((pose, index) => (
              <div 
                key={`${pose.id}-${index}`} 
                className="strip-frame"
                onClick={() => setSelectedPhoto(pose)}
                title="Click to view full photo"
              >
                <div className="frame-image-wrap">
                  <img src={pose.src} alt={pose.label} loading="lazy" />
                </div>
                <span className="frame-caption">{pose.label}</span>
              </div>
            ))}
          </div>

          <div className="strip-footer">
            <span className="strip-heart">🤍</span>
            <span className="strip-endearment">Best Cuddle Partner in the World</span>
            <span className="strip-heart">🤍</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>✕</button>
            <div className="lightbox-img-wrapper">
              <img src={selectedPhoto.src} alt={selectedPhoto.label} />
            </div>
            <div className="lightbox-info">
              <span className="lightbox-date">Bedtime Cuddles &middot; September 30</span>
              <h3 className="lightbox-title">{selectedPhoto.label}</h3>
              <p className="lightbox-caption">
                One of our 11 authentic cuddle shots. You make laughing in bed the best part of every day!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
