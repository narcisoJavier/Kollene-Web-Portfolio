import { academicWorks } from "../data/content";

export default function AcademicWork({ onSelectPdf }) {
  return (
    <section id="academic" className="academic-work">
      <div className="container">
        <div className="section-label">Academic Research</div>
        <h2 className="section-title">Theoretical Papers & Urban Studies</h2>
        <p className="section-subtitle">
          Selected research publications, disaster-resilience proposals, and architectural reviews developed at Mapúa University. Click any card to read the complete manuscript.
        </p>

        <div className="academic-grid">
          {academicWorks.map((work) => (
            <div
              key={work.id}
              className="academic-card"
              onClick={() => onSelectPdf(work.pdf)}
            >
              <div className="academic-card-bg">
                <img src={work.preview} alt={work.title} loading="lazy" />
              </div>
              <div className="academic-card-overlay">
                <div className="academic-card-meta">
                  <span className="academic-type">{work.category}</span>
                  {work.date && <span className="academic-date">{work.date}</span>}
                </div>
                <h3 className="academic-card-title">{work.title}</h3>
                <p className="academic-card-desc">{work.description}</p>
                <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.7rem", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  <span>View PDF Document</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
