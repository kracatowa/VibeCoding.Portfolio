'use client';

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/ascii-1920-3.png';
    img.onload = () => setImageLoaded(true);
  }, []);

  const specializations = [
    'Modernisation cloud',
    "Intégration de données",
    'Automatisation flux de travail',
    'Déploiement CI/CD',
    'Assistance Programmation Générative',
  ];
  const colors = [
    'text-terracotta-500',
    'text-dustyBlue-600',
    'text-sage-500',
    'text-amber-500',
    'text-lavender-500',
  ];

  return (
    <>
      {/* Image positioned absolutely, not bound to any section */}
      <div 
        className="absolute top-0 right-0 pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundImage: 'url(/ascii-1920-3.png)',
          backgroundSize: 'auto 110vh',
          backgroundPosition: 'top right',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '110vh',
          zIndex: 0,
          opacity: imageLoaded ? 1 : 0,
        }}
      />
      
      <section
        id="accueil"
        className="pb-12 px-6 relative min-h-screen flex items-center"
      >
        <div className="max-w-4xl ml-8 md:ml- text-left relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-12xl md:text-8xl font-light mb-2 tracking-tight" style={{fontFamily: 'Georgia, serif'}}>
            <span className="text-dustyBlue-600 font-semibold">Océan Barras</span>
          </h1>
          <h2 className="text-xl md:text-4xl text-dustyBlue-400 font-semibold" style={{fontFamily: 'Inter, sans-serif'}}>
            Développeur Logiciels {''}
          </h2>
          
          <ul className="flex flex-col gap-3 mb-6 mt-16">
            {specializations.map((s, i) => (
              <li key={s} className="list-none">
                <span
                  className={`inline-block px-3 py-1 rounded-md text-sm md:text-base font-medium ${colors[i % colors.length]}`}
                  style={{ transitionDelay: `${i * 80}ms`, opacity: imageLoaded ? 1 : 0 }}
                >
                  {s}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mt-12">
            <a
              href="#portfolio"
              className="inline-flex w-auto items-center px-4 py-2 rounded-md text-sm font-medium bg-white/40 text-dustyBlue-700 hover:bg-white/60 transform transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
            >
              Projets
              <FontAwesomeIcon icon={faChevronDown} className={`w-4 h-4 ml-2 ${imageLoaded ? 'animate-pulse-down' : ''}`} />
            </a>

            <a
              href="#contact"
              className="inline-flex w-auto items-center px-4 py-2 rounded-md text-sm font-medium bg-white/40 text-dustyBlue-700 hover:bg-white/60 transform transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
            >
              Contact
              <FontAwesomeIcon icon={faChevronDown} className={`w-4 h-4 ml-2 ${imageLoaded ? 'animate-pulse-down' : ''}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
