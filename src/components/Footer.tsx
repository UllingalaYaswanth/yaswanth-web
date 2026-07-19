import React from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

export const Footer: React.FC = () => {
  const backToTopRef = useMagnetic<HTMLDivElement>();
  const githubRef = useMagnetic<HTMLAnchorElement>();
  const linkedinRef = useMagnetic<HTMLAnchorElement>();

  const handleBackToTop = () => {
    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <svg className="wave" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ height: '122px' }}>
        <path fill="var(--footer-bg)" d="M0,40 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"></path>
      </svg>
      
      <div className="footer-inner">
        <div className="container">
          <div className="footer-grid">
            {/* Left Column: Brand logo and info */}
            <div className="footer-brand">
              <div className="logo" style={{ color: '#fff' }}>
                YASWANTH<span>.</span>
              </div>
              <p className="footer-brand-desc">
                Frontend developer crafting fast, elegant, AI‑integrated web experiences.
              </p>
            </div>
            
            {/* Right Column: Social Links */}
            <div className="footer-socials">
              <h4 className="footer-socials-title">
                Connect
              </h4>
              <div className="footer-socials-icons">
                <a
                  ref={githubRef}
                  href="https://github.com/UllingalaYaswanth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  style={{ borderColor: 'rgba(255,255,255,.15)', color: '#fff' }}
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                  </svg>
                </a>
                <a
                  ref={linkedinRef}
                  href="https://www.linkedin.com/in/yaswanth-ullingala-0a780a204/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  style={{ borderColor: 'rgba(255,255,255,.15)', color: '#fff' }}
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <span>© 2026 Ullingala Yaswanth. All rights reserved.</span>
            <div
              ref={backToTopRef}
              className="back-to-top"
              id="backToTop"
              onClick={handleBackToTop}
              title="Back to Top"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
