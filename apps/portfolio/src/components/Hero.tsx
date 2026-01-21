import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Hero() {
  return (
    <section
      id="accueil"
      className="pb-12 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-light mb-8 tracking-tight" style={{fontFamily: 'Georgia, serif'}}>
            <span className="text-dustyBlue-600 font-semibold">Océan Barras</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-stone-600 mb-12 font-light" style={{fontFamily: 'Inter, sans-serif'}}>
            Full-Stack Developer <span className="text-terracotta-500">.NET</span> <span className="text-stone-400">·</span>{' '}
            <span className="text-dustyBlue-500">Azure</span> <span className="text-stone-400">·</span>{' '}
            <span className="text-sage-500">React</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="#contact" className="btn-primary">
              Contact
            </a>
            <a href="#portfolio" className="btn-secondary">
              Projects
            </a>
          </div>

          <div className="flex justify-center gap-8">
            <a
              href="mailto:ocean.barras@hotmail.com"
              className="text-stone-400 hover:text-terracotta-500 transition-colors"
              aria-label="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/ocean-barras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-dustyBlue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </a>
            <a
              href="tel:418-520-5929"
              className="text-stone-400 hover:text-sage-500 transition-colors"
              aria-label="Téléphone"
            >
              <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
