import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Styles
import './index.css';

// Components
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    // Expose Lenis instance to window for navigation scrollTo clicks
    (window as any).lenis = lenis;

    // Connect Lenis to ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis animation frame requests to the GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. Scroll Reveal Animations (fade-in + translate up + unblur)
    const reveals = gsap.utils.toArray('.reveal');
    const revealTriggers: ScrollTrigger[] = [];

    reveals.forEach((el: any) => {
      // Exclude hero section because it runs immediate timeline reveals on page load
      if (el.closest('.hero')) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      });
      revealTriggers.push(trigger);
    });

    // 3. Hero Section Entrance Timeline (runs immediately on load)
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero .eyebrow', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, 0.1)
      .to('.hero h1', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, 0.2)
      .to('.hero-role', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, 0.45)
      .to('.hero .desc', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, 0.6)
      .to('.hero-actions', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, 0.75)
      .to('.hero .socials', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, 0.9)
      .to('.hero-visual', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, 0.5);

    // Refresh triggers to compute target viewport positions
    ScrollTrigger.refresh();

    // Clean up animation loops, tickers, and listeners on component unmount
    return () => {
      lenis.destroy();
      delete (window as any).lenis;
      gsap.ticker.remove(tickerCallback);
      revealTriggers.forEach((t) => t.kill());
      heroTimeline.kill();
    };
  }, []);

  return (
    <>
      {/* Visual background overlay */}
      <div className="noise" />
      
      {/* Scaffolding elements */}
      <CustomCursor />
      <Navbar />
      
      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
