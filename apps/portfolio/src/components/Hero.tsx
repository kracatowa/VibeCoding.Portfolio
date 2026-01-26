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

  return (
    <>
      <section
        id="accueil"
        className="pb-12 px-6 relative min-h-screen flex items-center justify-center"
      >
        <div className="max-w-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light mb-4 tracking-tight text-center" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="text-dustyBlue-600 font-semibold">Océan Barras</span>
            </h1>
            <p className="text-lg md:text-2xl text-stone-600 font-light mb-8 mx-auto">
              <span className="block md:inline">Développeur logiciels</span>
              <span className="hidden md:inline"> • </span>
              <span className="block md:inline">Cloud & Intégration de données</span>
            </p>

            <p className="text-lg md:text-2xl text-stone-600 font-light mb-8 mx-auto">
              Pour des petits et moyen projets en développement logiciel, intégration de données et automatisation cloud.
            </p>

            <p className="text-lg md:text-2xl text-stone-600 font-light mb-8 max-w-md mx-auto">
              Taux abordable pour les startups et PME.
            </p>

            <div className="flex items-center justify-center gap-3 mt-12">
              <a
                href="#portfolio"
                className="inline-flex items-center content-center px-4 py-2 rounded-md text-sm font-medium bg-dustyBlue-600 text-white hover:bg-dustyBlue-700 transform transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                Voir mes projets
                <FontAwesomeIcon icon={faChevronDown} className={`w-4 h-4 ml-2 ${imageLoaded ? 'animate-pulse-down' : ''}`} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border border-dustyBlue-600 text-dustyBlue-700 hover:bg-dustyBlue-50 transform transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                Me contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
