import React, { useEffect, useState } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
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

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lenisInstance = (window as any).lenis;
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (lenisInstance) lenisInstance.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisInstance) lenisInstance.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (lenisInstance) lenisInstance.start();
    };
  }, [isMobileMenuOpen]);

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      lenisInstance.start();
      lenisInstance.scrollTo(id, { offset: -70 });
    } else {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
      <nav className={`${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="logo" onClick={(e) => scrollToSection(e, '#home')}>
            YASWANTH<span>.</span>
          </a>

          <div className="nav-links">
            <a ref={aboutRef} href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '#about')}>
              About
            </a>
            <a ref={skillsRef} href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '#skills')}>
              Skills
            </a>
            <a ref={expRef} href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '#experience')}>
              Experience
            </a>
            <a ref={projRef} href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '#projects')}>
              Projects
            </a>
            <a ref={contactRef} href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, '#contact')}>
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
              className={`nav-cta ${isScrolled ? 'visible' : ''}`}
              onClick={(e) => scrollToSection(e, '#contact')}
            >
              Let's talk
            </a>

            {/* Hamburger Mobile Menu Trigger */}
            <button
              className={`mobile-toggle-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#about" className={`mobile-menu-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => handleMobileLinkClick(e, '#about')}>
            About
          </a>
          <a href="#skills" className={`mobile-menu-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={(e) => handleMobileLinkClick(e, '#skills')}>
            Skills
          </a>
          <a href="#experience" className={`mobile-menu-link ${activeSection === 'experience' ? 'active' : ''}`} onClick={(e) => handleMobileLinkClick(e, '#experience')}>
            Experience
          </a>
          <a href="#projects" className={`mobile-menu-link ${activeSection === 'projects' ? 'active' : ''}`} onClick={(e) => handleMobileLinkClick(e, '#projects')}>
            Projects
          </a>
          <a href="#contact" className={`mobile-menu-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => handleMobileLinkClick(e, '#contact')}>
            Contact
          </a>
          <a href="#contact" className="mobile-menu-cta" onClick={(e) => handleMobileLinkClick(e, '#contact')}>
            Let's talk
          </a>
        </div>
      </div>
    </>
  );
};
