import { profile } from "../data/content";

export default function Contact() {
  return (
    <footer id="contact" className="contact">
      <div className="container">
        <div className="contact-content">
          <div className="section-label" style={{ justifyContent: "center" }}>
            Inquiries & Collaboration
          </div>
          <h2 className="contact-heading">
            Let's Shape Meaningful Spaces Together
          </h2>
          <p className="contact-text">
            I am always open to discussing architectural projects, sustainable design concepts, digital 3D modeling, and studio collaborations. Feel free to reach out directly.
          </p>

          <a 
            href={`mailto:${profile.email}`} 
            className="contact-email-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>{profile.email}</span>
          </a>

          <p className="contact-thankyou">
            Thank you for exploring my architectural portfolio.
          </p>
        </div>
      </div>

      <div className="footer" style={{ marginTop: "80px" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <p>
            &copy; {new Date().getFullYear()} {profile.name} &middot; Mapúa University BS Architecture
          </p>
          <p style={{ color: "var(--accent)" }}>
            Parametric &middot; Bioclimatic &middot; Filipino Vernacular
          </p>
        </div>
      </div>
    </footer>
  );
}
