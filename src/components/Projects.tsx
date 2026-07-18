import React from 'react';
import type { Project } from '../types/project';

const projectsData: Project[] = [
  {
    title: 'Miftah AI',
    eyebrow: 'AI Concierge Platform',
    desc: 'An AI‑powered concierge platform with RBAC, live analytics, and location‑aware assistance.',
    tags: ['React', 'FastAPI', 'AWS Bedrock', 'ChromaDB', 'Leaflet', 'RBAC'],
    color: 'linear-gradient(135deg, #1e3a8a, #2563EB)',
    overview: 'Miftah AI is an AI concierge platform that lets enterprise users query internal knowledge, get location‑aware recommendations, and manage access through role‑based permissions.',
    challenge: 'The team needed a chat‑first interface that stayed fast while streaming AI responses, rendering map data, and enforcing per‑role visibility — without janky re‑renders.',
    solution: 'Built a React front end with streaming response handling, virtualized chat lists, and a Leaflet layer synced to AWS Bedrock retrieval results via ChromaDB for context‑aware answers.',
    impact: ['3.2x faster response perception', '40% fewer support tickets', '99.9% uptime'],
    stats: [['3.2x', 'Perceived speed'], ['40%', 'Fewer tickets'], ['99.9%', 'Uptime']],
    snippet: `const stream = await bedrock.invokeStream({\n  prompt, context: chromaResults\n});\nfor await (const chunk of stream) {\n  appendToken(chunk.text);\n}`,
    liveUrl: 'https://miftah.ai/',
    image: '/projects/miftah.png'
  },
  {
    title: 'SellAnyHome.ai',
    eyebrow: 'Real Estate Marketplace',
    desc: 'A real‑time property marketplace with instant offer syncing across buyers and agents.',
    tags: ['React', 'TypeScript', 'Socket.io', 'Tailwind'],
    color: 'linear-gradient(135deg, #0f172a, #3B82F6)',
    overview: 'SellAnyHome.ai connects home sellers directly with buyers and agents, with live bidding and instant messaging built on Socket.io.',
    challenge: 'Offers and messages needed to sync in real time across many concurrent sessions without dropping updates or creating UI race conditions.',
    solution: 'Designed a typed event bus over Socket.io with optimistic UI updates and reconciliation, plus a component library in Tailwind for consistent, fast‑loading listing pages.',
    impact: ['<150ms live update latency', '2x listing conversion', 'Zero desync incidents post-launch'],
    stats: [['<150ms', 'Update latency'], ['2x', 'Conversion lift'], ['0', 'Desync bugs']],
    snippet: `socket.on('offer:update', (payload) => {\n  dispatch(reconcileOffer(payload));\n});`,
    liveUrl: 'https://www.sellanyhome.ai/',
    image: '/projects/sellanyhome.png'
  },
  {
    title: 'Digital Twin & Asset Management',
    eyebrow: 'Telecom · GIS',
    desc: '3D digital twin of telecom tower infrastructure with live asset tracking.',
    tags: ['React', 'Three.js', 'CesiumJS', 'Leaflet', 'AWS S3', 'GLTF'],
    color: 'linear-gradient(135deg, #1e293b, #2563EB)',
    overview: 'A geospatial digital twin platform visualizing telecom tower assets in 3D, streaming GLTF models from AWS S3 onto a CesiumJS globe.',
    challenge: 'Loading and rendering large GIS + 3D datasets in‑browser without freezing the UI, while keeping the globe interaction buttery smooth.',
    solution: 'Implemented progressive GLTF loading, tile‑based CesiumJS rendering, and a Three.js overlay for close‑up asset inspection, all lazy‑loaded by viewport.',
    impact: ['60fps globe interaction', '75% faster asset lookup', 'Adopted across 3 regional teams'],
    stats: [['60fps', 'Globe render'], ['75%', 'Faster lookup'], ['3', 'Teams onboarded']],
    snippet: `const tileset = await Cesium3DTileset.fromUrl(url);\nviewer.scene.primitives.add(tileset);`,
    liveUrl: 'https://dt.intelliod.com/',
    image: '/projects/digitaltwin.png'
  },
  {
    title: 'Neural Farms',
    eyebrow: 'Agriculture · IoT',
    desc: 'IoT‑driven agriculture dashboard with live sensor maps and yield analytics.',
    tags: ['React', 'Cesium', 'Leaflet', 'Firebase', 'Recharts', 'IoT'],
    color: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
    overview: 'Neural Farms visualizes live IoT sensor data across farmland, giving growers real‑time soil, moisture, and yield insights on a map‑first dashboard.',
    challenge: 'Firebase real‑time streams needed to drive both map markers and chart data without duplicate work or stale state across components.',
    solution: 'Built a shared data layer syncing Firebase listeners into a single store, feeding both Leaflet markers and Recharts visualizations for consistent, low‑latency updates.',
    impact: ['1000+ sensors supported live', '30% reduction in water usage for pilot farms', 'Real‑time alerts in <2s'],
    stats: [['1000+', 'Live sensors'], ['30%', 'Water saved'], ['<2s', 'Alert latency']],
    snippet: `onSnapshot(sensorsRef, (snap) => {\n  store.setSensors(snap.docs.map(toSensor));\n});`,
    liveUrl: 'https://nf.intelliod.com/',
    image: '/projects/neuralfarms.png'
  }
];

export const Projects: React.FC = () => {
  // const handleCardClick = (url?: string) => {
  //   if (url) {
  //     window.open(url, '_blank', 'noopener,noreferrer');
  //   }
  // };

  return (
    <section className="section-pad" id="projects" style={{ backgroundColor: 'var(--bg-2)' }}>
      <div className="container">
        <span className="section-tag reveal">Selected Work</span>
        <h2 className="section-title reveal">Products, not just pages.</h2>
        <p className="section-sub reveal">
          A few projects that show the range — AI platforms, real‑time marketplaces, and geospatial digital twins.
        </p>
        
        <div className="bento" id="bentoGrid">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="project reveal"
              // onClick={() => handleCardClick(project.liveUrl)}
              style={{ cursor: 'default' }}
            >
              <div
                className="project-media"
                style={project.image ? { backgroundImage: `url(${project.image})` } : { background: project.color }}
              />
              <div className="project-overlay" />
              
              <div className="project-content">
                <div className="project-eyebrow">{project.eyebrow}</div>
                <div className="project-title">{project.title}</div>
                <div className="project-desc">{project.desc}</div>
                <div className="project-tags">
                  {project.tags.map((t, idx) => (
                    <span key={idx} className="ptag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
