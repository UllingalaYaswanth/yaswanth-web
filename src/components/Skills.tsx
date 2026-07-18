import React, { useRef, useState } from 'react';
import awsIcon from '../assets/aws.svg';

interface Skill {
  name: string;
  slug: string;
  color: string;
}

const skillsData: Skill[] = [
  { name: 'React', slug: 'react', color: '61DAFB' },
  { name: 'React Native', slug: 'react', color: '61DAFB' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
  { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
  { name: 'Express', slug: 'express', color: '000000' },
  { name: 'FastAPI', slug: 'fastapi', color: '009688' },
  { name: 'Tailwind', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'AWS', slug: 'amazonaws', color: 'FF9900' },
  { name: 'Git', slug: 'git', color: 'F05032' },
  { name: 'Firebase', slug: 'firebase', color: 'FFCA28' },
  { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
  { name: 'MySQL', slug: 'mysql', color: '4479A1' },
  { name: 'Socket.io', slug: 'socketdotio', color: '010101' },
  { name: 'Three.js', slug: 'threedotjs', color: '000000' },
  { name: 'CesiumJS', slug: 'cesium', color: '6CADDF' },
  { name: 'Leaflet', slug: 'leaflet', color: '199900' },
  { name: 'Docker', slug: 'docker', color: '2496ED' },
  { name: 'Postman', slug: 'postman', color: 'FF6C37' },
  { name: 'Linux', slug: 'linux', color: 'FCC624' }
];

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  const getInitials = (n: string) => {
    return n.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();
  };

  const renderIcon = () => {
    if (skill.name === 'AWS') {
      return <img src={awsIcon} alt="AWS logo" style={{ width: '24px', height: '24px' }} />;
    }
    if (skill.name === 'Git') {
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          fill={`#${skill.color}`}
          style={{ width: '24px', height: '24px' }}
        >
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.187 0L8.708 2.624l3.244 3.243c.602-.161 1.292.006 1.747.462.463.464.625 1.164.455 1.77l3.244 3.244c.606-.17 1.306-.007 1.77.457.604.604.604 1.582 0 2.187-.604.603-1.582.603-2.187 0a1.535 1.535 0 0 1-.462-1.747L13.14 8.995c-.17.455-.61 1.053-1.07 1.222v6.62c.414.281.688.756.688 1.292 0 .857-.695 1.552-1.552 1.552-.857 0-1.552-.695-1.552-1.552 0-.536.274-1.011.688-1.292v-6.62c-.415-.281-.689-.756-.689-1.292 0-.46.205-.882.545-1.163L7.026 4.933 1.07 10.89c-.604.604-.604 1.582 0 2.187l10.48 10.478c.604.604 1.582.604 2.186 0l10.48-10.478c.604-.604.604-1.582 0-2.187z" />
        </svg>
      );
    }

    if (hasError) {
      return (
        <div
          className="icon-fallback"
          style={{
            background: `linear-gradient(135deg, #${skill.color}, #${skill.color}99)`
          }}
        >
          {getInitials(skill.name)}
        </div>
      );
    }

    return (
      <img
        src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
        alt={`${skill.name} logo`}
        loading="lazy"
        onError={() => setHasError(true)}
      />
    );
  };

  return (
    <div
      ref={cardRef}
      className="skill-card reveal"
      onMouseMove={handleMouseMove}
    >
      <div className="skill-icon">
        {renderIcon()}
      </div>
      <div className="skill-name">{skill.name}</div>
    </div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section className="section-pad" id="skills" style={{ backgroundColor: 'var(--bg-2)' }}>
      <div className="container">
        <span className="section-tag reveal">Skills</span>
        <h2 className="section-title reveal">A toolkit built for shipping.</h2>
        <p className="section-sub reveal">
          The technologies I reach for daily, across frontend, backend, and infrastructure.
        </p>
        <div className="skills-grid" id="skillsGrid">
          {skillsData.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};
