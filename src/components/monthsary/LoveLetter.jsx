import { useState } from "react";
import { loveLetterData } from "../../data/monthsaryData";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(true);
  const [showSecretPS, setShowSecretPS] = useState(false);

  return (
    <div className="love-letter-section" id="love-letter">
      <div className="letter-header-tag">
        <span className="wax-dot">💌</span>
        <span>Confidential &middot; For Kollene Aika's Eyes Only</span>
        <button 
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            marginLeft: "12px",
            background: "transparent",
            border: "1px solid var(--m-card-border)",
            borderRadius: "20px",
            padding: "3px 10px",
            fontSize: "0.72rem",
            color: "var(--m-text-sub)",
            cursor: "pointer"
          }}
        >
          {isOpen ? "Tuck into Envelope" : "Unfold Letter"}
        </button>
      </div>

      <div className={`envelope-container ${isOpen ? "letter-unfolded" : "letter-folded"}`}>
        <div className="letter-paper">
          <div className="letter-stamp-corner">
            <div className="postage-stamp">
              <span className="stamp-heart">💖</span>
              <span className="stamp-text">SEPT 30</span>
            </div>
            <div className="postage-seal">FIRST CLASS LOVE</div>
          </div>

          <div className="letter-meta">
            <span className="letter-date">{loveLetterData.date} &middot; Our Monthsary</span>
            <span className="letter-route">To: Kollene Aika P. Leyson</span>
            <span className="letter-sender">From: Narciso Javier</span>
          </div>

          <h2 className="letter-salutation">{loveLetterData.salutation}</h2>

          <div className="letter-body">
            {loveLetterData.bodyParagraphs.map((paragraph, index) => (
              <p key={index} className="letter-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="letter-signoff-block">
            <p className="letter-signoff">{loveLetterData.signOff}</p>
            <p className="letter-signature">{loveLetterData.signature}</p>
          </div>

          {/* Secret P.S. Interactive Reveal */}
          <div className="letter-ps-wrapper">
            {!showSecretPS ? (
              <button 
                className="btn-secret-ps"
                onClick={() => setShowSecretPS(true)}
              >
                <span>🤫 Unfold Secret P.S. Note</span>
                <span className="ps-sparkle">✨</span>
              </button>
            ) : (
              <div className="letter-ps-content animate-fade-in">
                <div className="ps-badge">Secret Note</div>
                <p>{loveLetterData.postScript}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
