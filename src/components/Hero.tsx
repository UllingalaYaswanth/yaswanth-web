import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useMagnetic } from '../hooks/useMagnetic';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('Frontend Developer');

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

  // Three.js Background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    // Create central icosahedron wireframe
    const geo = new THREE.IcosahedronGeometry(2.6, 1);
    const wire = new THREE.WireframeGeometry(geo);
    const mat = new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.35 });
    const mesh = new THREE.LineSegments(wire, mat);
    scene.add(mesh);

    // Create floating particles
    const pCount = 220;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.035, transparent: true, opacity: 0.55 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Track mouse coordinates
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);

    // Resize handler with mobile responsive mesh positioning
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // Reposition wireframe sphere depending on screen size
      const isMobile = w < 768;
      mesh.position.set(isMobile ? 0 : 3.2, isMobile ? -1.8 : -0.4, 0);
    };

    handleResize(); // Initial sizing
    window.addEventListener('resize', handleResize);

    // Animation frame request loop
    let animId: number;
    const animate = () => {
      mesh.rotation.x += 0.0022;
      mesh.rotation.y += 0.0032;
      particles.rotation.y += 0.0003;

      // Smooth camera interpolation based on mouse
      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Clean up WebGL resources
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      geo.dispose();
      wire.dispose();
      mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

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
      <canvas id="hero-canvas" ref={canvasRef} />
      <div className="blob" style={{ width: '520px', height: '520px', background: '#3B82F6', top: '-10%', left: '-10%' }} />
      <div className="blob" style={{ width: '460px', height: '460px', background: '#2563EB', bottom: '-15%', right: '-5%' }} />
      
      <div className="container">
        <div className="eyebrow reveal">
          <span className="dot" /> Open to opportunities · Based in India
        </div>
        <h1 className="reveal">
          Hi, I'm <br />
          Yaswanth.
        </h1>
        <div className="hero-role reveal">
          <span>{typedText}</span>
          <span className="cursor-blink">&nbsp;</span>
        </div>
        <p className="desc reveal">
          I build fast, elegant interfaces and AI‑integrated applications — from React design systems to real‑time GIS and digital‑twin platforms — with 3+ years shipping production frontend at scale.
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
      
      <div className="scroll-hint">
        <div className="mouse">
          <div className="wheel" />
        </div>
        Scroll
      </div>
    </section>
  );
};
