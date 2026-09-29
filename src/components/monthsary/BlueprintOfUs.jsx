import { useState, useEffect } from "react";
import { relationshipPillars, reasonsILoveYou, randomLoveNotes, monthsaryConfig } from "../../data/monthsaryData";

export default function BlueprintOfUs() {
  const [activeReason, setActiveReason] = useState(null);
  const [currentRandomNote, setCurrentRandomNote] = useState(null);
  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate live counter from start date (March 30, 2026)
  useEffect(() => {
    const startDate = new Date(monthsaryConfig.anniversaryStartDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - startDate);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsedTime({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const drawRandomNote = () => {
    const randomIndex = Math.floor(Math.random() * randomLoveNotes.length);
    setCurrentRandomNote(randomLoveNotes[randomIndex]);
  };

  return (
    <div className="blueprint-section" id="blueprint">
      {/* 6th Monthsary Milestone Title Block */}
      <div className="cad-title-block">
        <div className="cad-block-header">
          <div className="cad-seal">
            <span className="cad-seal-ring">💖</span>
            <div className="cad-seal-text">
              <strong>HAPPY 6TH MONTHSARY</strong>
              <span>MARCH 30 &rarr; SEPTEMBER 30, 2026</span>
            </div>
          </div>
          <div className="cad-sheet-info">
            <div className="cad-cell">
              <span className="cad-label">MILESTONE</span>
              <span className="cad-val">6 Months Together</span>
            </div>
            <div className="cad-cell">
              <span className="cad-label">1ST MONTHSARY</span>
              <span className="cad-val">April 30, 2026</span>
            </div>
            <div className="cad-cell">
              <span className="cad-label">FAVORITE DUO</span>
              <span className="cad-val">Javier &hearts; Kollene</span>
            </div>
            <div className="cad-cell">
              <span className="cad-label">STATUS</span>
              <span className="cad-val">In Love Forever</span>
            </div>
          </div>
        </div>

        {/* Live Relationship Counter */}
        <div className="counter-strip">
          <div className="counter-title">
            <span className="pulse-heart">💓</span>
            <span>CELEBRATING EVERY MOMENT SINCE DAY ONE</span>
          </div>
          <div className="counter-grid">
            <div className="counter-box">
              <span className="counter-num">{elapsedTime.days}</span>
              <span className="counter-unit">DAYS</span>
            </div>
            <div className="counter-box">
              <span className="counter-num">{String(elapsedTime.hours).padStart(2, "0")}</span>
              <span className="counter-unit">HOURS</span>
            </div>
            <div className="counter-box">
              <span className="counter-num">{String(elapsedTime.minutes).padStart(2, "0")}</span>
              <span className="counter-unit">MINUTES</span>
            </div>
            <div className="counter-box">
              <span className="counter-num counter-seconds">{String(elapsedTime.seconds).padStart(2, "0")}</span>
              <span className="counter-unit">SECONDS</span>
            </div>
          </div>
          <p className="counter-caption">
            Half a year down, and my heart still skips a beat every time I see you.
          </p>
        </div>
      </div>

      {/* Featured Masterpiece Portrait */}
      <div className="masterpiece-banner">
        <div className="masterpiece-image-wrap">
          <img 
            src="/media/df7133a1-6499-4ff3-874a-0384bbfd98b6.jpg" 
            alt="Colored Pencil Sketch of Kollene & Javier" 
          />
        </div>
        <div className="masterpiece-caption">
          <span className="masterpiece-tag">ARTWORK &middot; US IN STYLE</span>
          <h4 className="masterpiece-title">The Grand Masterpiece</h4>
          <p className="masterpiece-text">
            You looking gorgeous in your light blue gown, me in my suit, arm-in-arm. An artistic tribute to the most stunning couple.
          </p>
        </div>
      </div>

      {/* Relationship Pillars Grid */}
      <div className="specs-container">
        <div className="section-intro">
          <span className="section-badge">The Foundations of Us</span>
          <h3 className="section-heading">What Makes Us Strong & Special</h3>
          <p className="section-subtext">
            The little things, the shared laughs, and the devotion that built our past 6 months.
          </p>
        </div>

        <div className="specs-grid">
          {relationshipPillars.map((item) => (
            <div key={item.code} className="spec-card">
              <div className="spec-top">
                <span className="spec-code">{item.code}</span>
                <span className="spec-icon">{item.icon}</span>
              </div>
              <h4 className="spec-title">{item.title}</h4>
              <div className="spec-rating">{item.highlight}</div>
              <p className="spec-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reasons Why I Love You Interactive Section */}
      <div className="reasons-container" id="reasons">
        <div className="section-intro">
          <span className="section-badge">Heartfelt Highlights</span>
          <h3 className="section-heading">Why You Mean Everything to Me</h3>
          <p className="section-subtext">
            Just a few of the endless reasons why loving you is the best part of my life.
          </p>
        </div>

        <div className="reasons-grid">
          {reasonsILoveYou.map((reason) => {
            const isExpanded = activeReason === reason.id;
            return (
              <div 
                key={reason.id} 
                className={`reason-card ${isExpanded ? "active" : ""}`}
                onClick={() => setActiveReason(isExpanded ? null : reason.id)}
              >
                <div className="reason-header">
                  <span className="reason-tag">{reason.tag}</span>
                  <span className="reason-toggle">{isExpanded ? "▲" : "▼"}</span>
                </div>
                <h4 className="reason-title">{reason.title}</h4>
                <div className="reason-subtitle">{reason.subtitle}</div>
                <p className="reason-text">{reason.text}</p>
                <div className="reason-footer">
                  <span className="reason-hint">
                    {isExpanded ? "Tap to tuck away" : "Tap to focus ✨"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Random Love Note Generator */}
        <div className="random-note-box">
          <div className="note-box-left">
            <span className="note-jar-icon">🏺</span>
            <div>
              <h4 className="note-box-title">Javier's Sweet Note Jar</h4>
              <p className="note-box-sub">Need a reminder of how special you are? Pick a note anytime!</p>
            </div>
          </div>
          <button className="btn-draw-note" onClick={drawRandomNote}>
            <span>Pick a Love Note 💌</span>
          </button>
        </div>

        {currentRandomNote && (
          <div className="random-note-display animate-pop">
            <div className="note-pin">📌</div>
            <p className="note-message">"{currentRandomNote}"</p>
            <div className="note-author">— With all my love, Javier 💖</div>
          </div>
        )}
      </div>
    </div>
  );
}
