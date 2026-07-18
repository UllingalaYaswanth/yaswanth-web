import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Job {
  date: string;
  role: string;
  company: string;
  bullets: string[];
  tags: string[];
}

const experienceData: Job[] = [
  {
    date: 'MAY 2024 — PRESENT',
    role: 'Frontend Developer',
    company: 'Intelliod Private Ltd',
    bullets: [
      'Build and maintain client-facing web applications end to end using React.js, TypeScript, and Tailwind CSS, working directly with clients to turn requirements into shipped features',
      'Designed role-based access control and multi-tenant permission systems used across several client projects, including protected routes and permission-aware UI',
      'Added real-time functionality (chat, notifications, live updates) with Socket.io, and integrated AI-assisted features using FastAPI and AWS Bedrock',
      'Improved page load performance through lazy loading, code splitting, and React Suspense on larger, data-heavy applications'
    ],
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'AWS Bedrock', 'Socket.io']
  },
  {
    date: 'JULY 2023 — APR 2024',
    role: 'Software Engineer',
    company: 'Rosys Virtual Solutions',
    bullets: [
      'Built object detection and facial recognition models, iterating with the team to improve accuracy and reliability',
      'Worked with clients to translate business requirements into practical web solutions',
      'Tuned front-end performance and SEO fundamentals, cutting page load times'
    ],
    tags: ['AI Models', 'Object Detection', 'FastAPI', 'Python', 'SEO']
  },
  {
    date: 'MAR 2023 — APR 2023',
    role: 'Intern, Software Engineer',
    company: 'NexSemi Private Ltd',
    bullets: [
      'Helped develop and optimize embedded firmware for semiconductor devices',
      'Supported firmware updates and debugging to improve product stability'
    ],
    tags: ['Firmware', 'C/C++', 'Semiconductors', 'Debugging']
  },
  {
    date: 'NOV 2022 — FEB 2023',
    role: 'Intern, Drone Architect',
    company: 'Innovation Center for Drone Technologies (ICDT)',
    bullets: [
      'Contributed to a hexacopter drone built for agricultural crop monitoring',
      'Worked with the engineering team on system design and field testing'
    ],
    tags: ['Drone Tech', 'System Design', 'Field Testing', 'Embedded Systems']
  }
];

export const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = timelineRef.current?.querySelectorAll('.timeline-item');
    if (!items) return;

    const triggers: ScrollTrigger[] = [];

    items.forEach((item) => {
      const dot = item.querySelector('.timeline-dot');
      if (!dot) return;

      const trigger = ScrollTrigger.create({
        trigger: item as HTMLElement,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            dot,
            { scale: 0 },
            { scale: 1, duration: 0.5, ease: 'back.out(3)', overwrite: 'auto' }
          );
        }
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="section-pad" id="experience">
      <div className="container" ref={timelineRef}>
        <span className="section-tag reveal">Experience</span>
        <h2 className="section-title reveal">Where I've built things.</h2>
        
        <div className="timeline" style={{ marginTop: '56px' }}>
          {experienceData.map((job, index) => {
            const isEven = index % 2 === 1;

            const cardElement = (
              <div className="timeline-card" key="card">
                <div className="timeline-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div className="timeline-role">{job.role}</div>
                <div className="timeline-company">{job.company}</div>
                <ul style={{ color: 'var(--text-2)', fontSize: '.92rem', lineHeight: 1.7, paddingLeft: '20px', marginTop: '8px', marginBottom: '16px' }}>
                  {job.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ marginBottom: '6px' }}>{bullet}</li>
                  ))}
                </ul>
                <div style={{ marginTop: '12px' }}>
                  {job.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );

            const dateElement = (
              <div className="timeline-date" key="date">
                {job.date}
              </div>
            );

            return (
              <div key={index} className="timeline-item reveal">
                <div className="timeline-dot" />
                {isEven ? [dateElement, cardElement] : [cardElement, dateElement]}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Experience;
