import React, { useEffect, useRef, useState } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';
import profileImg from '../assets/yaswanth_profile.jpeg';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('Frontend Developer');
  const cardRef = useRef<HTMLDivElement>(null);

  // Magnetic refs
  const viewProjectsRef = useMagnetic();
  const downloadResumeRef = useMagnetic();
  const contactMeRef = useMagnetic();
  const githubRef = useMagnetic();
  const linkedinRef = useMagnetic();
  const emailRef = useMagnetic();

  // Typing animation loop
  useEffect(() => {
    const roles = ['Frontend Developer', 'React Developer', 'TypeScript Developer', 'AI Integrated Applications'];
    let ri = 0;
    let ci = roles[0].length;
    let deleting = true;
    let timer: number;

    const typeLoop = () => {
      const word = roles[ri];
      if (!deleting) {
        ci++;
        setTypedText(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          timer = window.setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        ci--;
        setTypedText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }
      timer = window.setTimeout(typeLoop, deleting ? 40 : 80);
    };

    timer = window.setTimeout(typeLoop, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Card Mouse Move Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize coordinates (-1 to 1)
    const px = x / (rect.width / 2);
    const py = y / (rect.height / 2);
    
    gsap.to(card, {
      rotateY: px * 12,
      rotateX: -py * 12,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power2.out',
      duration: 0.6
    });
  };

  // Ripple click handler for buttons
  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(id, { offset: -70 });
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="blob" style={{ width: '520px', height: '520px', background: '#3B82F6', top: '-10%', left: '-10%' }} />
      <div className="blob" style={{ width: '460px', height: '460px', background: '#2563EB', bottom: '-15%', right: '-5%' }} />
      <div className="blob" style={{ width: '300px', height: '300px', background: '#A855F7', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.12 }} />
      
      <div className="container hero-container">
        {/* Left Column: Introduction */}
        <div className="hero-text">
          <h1 className="reveal">
            Hi, I'm <br />
            Yaswanth.
          </h1>
          <div className="hero-role reveal">
            <span>{typedText}</span>
            <span className="cursor-blink">&nbsp;</span>
          </div>
          <p className="desc reveal">
            I build fast, elegant interfaces and AI‑integrated applications from React design systems to real‑time GIS and digital‑twin platforms with 3+ years shipping production frontend at scale.
          </p>
          <div className="hero-actions reveal">
            <a
              ref={viewProjectsRef}
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => { handleRipple(e); handleScrollTo(e, '#projects'); }}
            >
              View Projects
            </a>
            <a
              ref={downloadResumeRef}
              href="#"
              className="btn btn-outline"
              id="resumeBtn"
              onClick={handleRipple}
            >
              Download Resume
            </a>
            <a
              ref={contactMeRef}
              href="#contact"
              className="btn btn-outline"
              onClick={(e) => { handleRipple(e); handleScrollTo(e, '#contact'); }}
            >
              Contact Me
            </a>
          </div>
          
          <div className="socials reveal">
            <a
              ref={githubRef}
              href="https://github.com/UllingalaYaswanth"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
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
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
            <a
              ref={emailRef}
              href="mailto:yaswanthullingala@gmail.com"
              className="social-icon"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" opacity="0" />
                <path d="M22 6l-10 7L2 6" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Portrait Card */}
        <div className="hero-visual reveal">
          <div 
            ref={cardRef}
            className="profile-card-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="profile-card-glow" />
            <div className="profile-card-inner">
              <img src={profileImg} alt="Yaswanth Ullingala portrait" className="profile-img" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-hint">
        <div className="mouse">
          <div className="wheel" />
        </div>
        Scroll
      </div>
    </section>
  );
};
export default Hero;
