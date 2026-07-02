import { profile } from "../data/content";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-layout">
          {/* Left Column - Portrait & Credential Badge */}
          <div className="about-photo-wrapper">
            <div className="about-photo">
              <img 
                src="/images/kollene-photo.png" 
                alt={profile.name} 
                loading="lazy" 
              />
            </div>
            <div className="about-photo-accent" />

            <div className="glass-card" style={{ marginTop: "24px", padding: "20px" }}>
              <div className="detail-row">
                <span className="detail-label">Institution</span>
                <span className="detail-value">{profile.institution}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Program</span>
                <span className="detail-value">BS Architecture</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Course Code</span>
                <span className="detail-value">{profile.course} &middot; Sec {profile.section}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Student ID</span>
                <span className="detail-value">{profile.studentId}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Bio, Skills & Research Interests */}
          <div className="about-content">
            <div>
              <div className="section-label">Architectural Profile</div>
              <h2 className="section-title">Design Philosophy & Background</h2>
            </div>

            <div className="about-text">
              {profile.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Quote Block */}
            <div 
              style={{
                padding: "20px 24px",
                background: "rgba(212,165,116,0.06)",
                borderLeft: "3px solid var(--accent)",
                borderRadius: "0 12px 12px 0",
                margin: "12px 0"
              }}
            >
              <p style={{ fontStyle: "italic", color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: "6px" }}>
                "{profile.quote.text}"
              </p>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)" }}>
                &mdash; {profile.quote.author}
              </span>
            </div>

            {/* Cards Grid */}
            <div className="about-cards">
              {/* Software Skills */}
              <div className="about-card">
                <h3>CAD & Visualization Tools</h3>
                <div className="skills-grid">
                  {profile.skills.map((skill, idx) => (
                    <div key={idx} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-bar-fill" 
                          style={{ width: skill.level }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research & Focus Areas */}
              <div className="about-card">
                <h3>Research & Studio Focus</h3>
                <ul className="interests-list">
                  {profile.interests.map((interest, idx) => (
                    <li key={idx}>
                      <span style={{ color: "var(--accent)", marginRight: "6px" }}>&bull;</span>
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
