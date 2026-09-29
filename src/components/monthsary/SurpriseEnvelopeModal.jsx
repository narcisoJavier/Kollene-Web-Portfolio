import { useState } from "react";
import { monthsaryConfig } from "../../data/monthsaryData";

export default function SurpriseEnvelopeModal({ onOpenSurprise, onClose }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => {
      onOpenSurprise();
    }, 700);
  };

  return (
    <div className="surprise-modal-backdrop">
      <div className={`surprise-envelope-card ${opening ? "envelope-opening" : ""}`}>
        <button 
          className="modal-close-icon" 
          onClick={onClose}
          aria-label="Close surprise"
          title="Browse architecture portfolio"
        >
          ✕
        </button>

        <div className="envelope-badge-top">
          <span className="sparkle-icon">✨</span>
          <span>SPECIAL DELIVERY &middot; SEPTEMBER 30</span>
        </div>

        <div className="envelope-illustration">
          <div className="envelope-wrapper">
            <div className="envelope-flap" />
            <div className="envelope-pocket">
              <div className="envelope-letter-peek">
                <span>To: Kollene Aika 💌</span>
              </div>
            </div>
            <div 
              className="envelope-wax-seal" 
              onClick={handleOpen}
              title="Click to break seal!"
            >
              <span className="seal-monogram">J&hearts;K</span>
              <span className="seal-date">09.30</span>
            </div>
          </div>
        </div>

        <div className="envelope-text-content">
          <h2 className="envelope-title">Happy Monthsary, my Motmot! 💖</h2>
          <p className="envelope-recipient">
            Addressed to: <strong>{monthsaryConfig.herName}</strong>
          </p>
          <p className="envelope-message">
            Before you review your 3D models and plates, Javier prepared a special surprise celebration dedicated solely to you and the love you two share.
          </p>

          <div className="envelope-action-buttons">
            <button 
              className="btn-open-surprise"
              onClick={handleOpen}
            >
              <span>Break Seal & Open Surprise 💝</span>
            </button>
            <button 
              className="btn-skip-portfolio" 
              onClick={onClose}
            >
              <span>View Architecture Portfolio First 📐</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
