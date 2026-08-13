import { useState, useEffect } from "react";

export default function PDFViewer({ pdf, onClose }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!pdf) return null;

  return (
    <div className="pdf-modal" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="pdf-close" 
          onClick={onClose}
          aria-label="Close PDF Viewer"
        >
          &times;
        </button>
        <div className="pdf-wrapper">
          {loading && (
            <div className="pdf-loading">
              <div className="loading-spinner" style={{ margin: "0 auto 12px" }}></div>
              Loading Document...
            </div>
          )}
          <iframe
            src={`${pdf}#view=FitH`}
            className="pdf-iframe"
            title="PDF Document Viewer"
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
