import React, { useEffect, useState } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    // Initialize theme based on document HTML class or system preference
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Apply magnetic effect to links and buttons
  const aboutRef = useMagnetic();
  const skillsRef = useMagnetic();
  const expRef = useMagnetic();
  const projRef = useMagnetic();
  const contactRef = useMagnetic();
  const toggleRef = useMagnetic<HTMLButtonElement>();
  const ctaRef = useMagnetic();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const h = document.documentElement;
      const totalHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      if (totalHeight > 0) {
        const progress = ((h.scrollTop || document.body.scrollTop) / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(id, { offset: -70 });
    } else {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="progress" style={{ width: `${scrollProgress}%` }} />

      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="container nav-inner">
          <a href="#home" className="logo" onClick={(e) => scrollToSection(e, '#home')}>
            YASWANTH<span>.</span>
          </a>

          <div className="nav-links">
            <a ref={aboutRef} href="#about" className="nav-link" onClick={(e) => scrollToSection(e, '#about')}>
              About
            </a>
            <a ref={skillsRef} href="#skills" className="nav-link" onClick={(e) => scrollToSection(e, '#skills')}>
              Skills
            </a>
            <a ref={expRef} href="#experience" className="nav-link" onClick={(e) => scrollToSection(e, '#experience')}>
              Experience
            </a>
            <a ref={projRef} href="#projects" className="nav-link" onClick={(e) => scrollToSection(e, '#projects')}>
              Projects
            </a>
            <a ref={contactRef} href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, '#contact')}>
              Contact
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              ref={toggleRef}
              className="theme-toggle"
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
            >
              {isDark ? (
                // Sun Icon for Light Mode
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                // Moon Icon for Dark Mode
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            
            {/* Show dynamic let's talk button on scroll or desktop */}
            <a
              ref={ctaRef}
              href="#contact"
              className="nav-cta"
              onClick={(e) => scrollToSection(e, '#contact')}
              style={{ display: isScrolled ? 'block' : 'none' }}
            >
              Let's talk
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
