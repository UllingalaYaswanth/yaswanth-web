import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statNums = statsContainerRef.current?.querySelectorAll('.stat-num');
    if (!statNums) return;

    const triggers: ScrollTrigger[] = [];

    statNums.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const targetCount = parseFloat(htmlEl.getAttribute('data-count') || '0');
      const suffix = htmlEl.getAttribute('data-suffix') || '';

      const trigger = ScrollTrigger.create({
        trigger: htmlEl,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const counterObj = { value: 0 };
          gsap.to(counterObj, {
            value: targetCount,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              htmlEl.textContent = Math.round(counterObj.value) + suffix;
            }
          });
        }
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="section-pad" id="about">
      <div className="container about-grid">
        <div ref={statsContainerRef}>
          <span className="section-tag reveal">About</span>
          <h2 className="section-title reveal">Frontend engineering, grounded in real product problems.</h2>
          <p className="section-sub reveal">
            I'm Ullingala Yaswanth, a frontend developer focused on building interactive, high‑performance interfaces — from AI concierge platforms to digital‑twin visualizations. I care about the details that separate a good UI from a forgettable one: motion timing, state clarity, and code that stays fast as it scales.
          </p>
          <div style={{ marginTop: '26px' }} className="reveal">
            <span className="focus-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)"/>
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)"/>
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)"/>
                <circle cx="12" cy="12" r="1.5" fill="var(--blue)"/>
              </svg>
              Interactive UI
            </span>
            <span className="focus-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <path d="M9 9h6v6H9z"/>
                <path d="M9 1v3"/>
                <path d="M15 1v3"/>
                <path d="M9 20v3"/>
                <path d="M15 20v3"/>
                <path d="M20 9h3"/>
                <path d="M20 15h3"/>
                <path d="M1 9h3"/>
                <path d="M1 15h3"/>
              </svg>
              AI Applications
            </span>
            <span className="focus-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                <line x1="9" y1="3" x2="9" y2="18"/>
                <line x1="15" y1="6" x2="15" y2="21"/>
              </svg>
              GIS Visualization
            </span>
            <span className="focus-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              Digital Twin
            </span>
            <span className="focus-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-.79A4.8 4.8 0 0 0 8.2 8a4.8 4.8 0 0 0-.07 1h-.13A4.8 4.8 0 0 0 3 14c0 2.65 2.15 4.8 4.8 4.8h10.4a4.8 4.8 0 0 0 0-9.6z"/>
              </svg>
              Cloud Applications
            </span>
          </div>
          <div className="stats-grid">
            <div className="stat-card reveal">
              <div className="stat-num" data-count="7">0</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-num" data-count="3" data-suffix="+">0</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-num" data-count="18">0</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-num" data-count="4">0</div>
              <div className="stat-label">Happy Clients</div>
            </div>
          </div>
        </div>
        
        <div className="glass reveal sticky-card" style={{ padding: '32px' }}>
          <h4 style={{ fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--blue)', marginBottom: '20px', fontWeight: 700 }}>
            Snapshot
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-line)', paddingBottom: '14px' }}>
              <span style={{ color: 'var(--text-2)', fontSize: '.88rem' }}>Name</span>
              <span style={{ fontWeight: 600 }}>Ullingala Yaswanth</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-line)', paddingBottom: '14px' }}>
              <span style={{ color: 'var(--text-2)', fontSize: '.88rem' }}>Role</span>
              <span style={{ fontWeight: 600 }}>Frontend Developer</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-line)', paddingBottom: '14px' }}>
              <span style={{ color: 'var(--text-2)', fontSize: '.88rem' }}>Experience</span>
              <span style={{ fontWeight: 600 }}>3+ Years</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-line)', paddingBottom: '14px' }}>
              <span style={{ color: 'var(--text-2)', fontSize: '.88rem' }}>Location</span>
              <span style={{ fontWeight: 600 }}>India</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-2)', fontSize: '.88rem' }}>Stack</span>
              <span style={{ fontWeight: 600, textAlign: 'right' }}>React · TS · Node · AWS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
