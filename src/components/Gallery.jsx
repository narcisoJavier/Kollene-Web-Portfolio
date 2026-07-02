import { useState } from "react";
import { galleryItems } from "../data/content";

export default function Gallery({ onSelectPdf }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Design Plates", "Academic Papers", "Reflections"];

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="gallery" style={{ padding: "var(--section-padding)", background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-label">Visual Archive</div>
        <h2 className="section-title">Design Plates & Studio Archive</h2>
        <p className="section-subtitle">
          Manual drawing plates, spot essay analyses, structural schematics, and design research documentation.
        </p>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 600,
                border: "1px solid",
                borderColor: activeCategory === cat ? "var(--accent)" : "var(--border)",
                background: activeCategory === cat ? "var(--accent-glow)" : "rgba(255,255,255,0.02)",
                color: activeCategory === cat ? "var(--accent)" : "var(--text-secondary)",
                transition: "all 0.3s var(--ease-out)",
                cursor: "pointer"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-flat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {filteredItems.map((item) => {
            if (item.type === "image") {
              return (
                <div
                  key={item.id}
                  className="gallery-card"
                  onClick={() => setSelectedImg(item)}
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.4s var(--ease-out)"
                  }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#000" }}>
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s var(--ease-out)" }}
                    />
                  </div>
                  <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span className="gallery-card-badge">{item.category}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => onSelectPdf(item.pdf)}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.4s var(--ease-out)"
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#000" }}>
                  <img
                    src={item.preview}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(10,10,11,0.8)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)"
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                </div>
                <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span className="gallery-card-badge">{item.category}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Modal Lightbox */}
      {selectedImg && (
        <div className="gallery-modal" onClick={() => setSelectedImg(null)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-close" onClick={() => setSelectedImg(null)}>
              &times;
            </button>
            <img src={selectedImg.src} alt={selectedImg.title} />
            <p className="gallery-caption">{selectedImg.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
