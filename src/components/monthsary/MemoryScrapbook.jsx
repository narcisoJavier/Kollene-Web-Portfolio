import { useState, useRef } from "react";
import { scrapbookMemories } from "../../data/monthsaryData";

export default function MemoryScrapbook() {
  const [memories, setMemories] = useState(scrapbookMemories);
  const [activePhoto, setActivePhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newMemory = {
        id: `custom-${Date.now()}`,
        title: "Our Precious Memory",
        date: "Special Moment",
        caption: "A photo of us holding hands, laughing, and building our forever.",
        polaroidColor: "#ffffff",
        pinColor: "#e11d48",
        rotation: "1deg",
        image: url,
        alt: "Custom Memory"
      };
      setMemories((prev) => [newMemory, ...prev]);
    }
  };

  return (
    <div className="scrapbook-section" id="scrapbook">
      <div className="section-intro">
        <span className="section-badge">Moments & Milestones</span>
        <h3 className="section-heading">Our Memory Scrapbook</h3>
        <p className="section-subtext">
          Every snapshot, every laugh, and every plate submission where we stood by each other.
        </p>
      </div>

      <div className="scrapbook-actions">
        <button 
          className="btn-add-memory" 
          onClick={() => fileInputRef.current?.click()}
          title="Add a custom photo of you two"
        >
          <span>📷 Add Our Photo to Scrapbook</span>
        </button>
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/*" 
          onChange={handleFileUpload} 
          style={{ display: "none" }} 
        />
      </div>

      <div className="polaroid-grid">
        {memories.map((mem) => (
          <div 
            key={mem.id} 
            className="polaroid-card"
            style={{ 
              transform: `rotate(${mem.rotation})`,
              backgroundColor: mem.polaroidColor 
            }}
            onClick={() => setActivePhoto(mem)}
          >
            <div className="polaroid-pin" style={{ backgroundColor: mem.pinColor }} />
            <div className="polaroid-image-frame">
              <img 
                src={mem.image} 
                alt={mem.alt} 
                loading="lazy" 
                onError={(e) => {
                  e.target.src = "/images/kollene-photo.png";
                }}
              />
            </div>
            <div className="polaroid-caption-block">
              <h4 className="polaroid-title">{mem.title}</h4>
              <span className="polaroid-date">{mem.date}</span>
              <p className="polaroid-desc">{mem.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Enlarged Photo Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-overlay" onClick={() => setActivePhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActivePhoto(null)}>✕</button>
            <div className="lightbox-img-wrapper">
              <img src={activePhoto.image} alt={activePhoto.alt} />
            </div>
            <div className="lightbox-info">
              <span className="lightbox-date">{activePhoto.date}</span>
              <h3 className="lightbox-title">{activePhoto.title}</h3>
              <p className="lightbox-caption">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
