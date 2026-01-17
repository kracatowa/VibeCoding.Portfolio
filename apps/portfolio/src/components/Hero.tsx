import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Hero() {
  return (
    <section
      id="accueil"
      className="pt-20 flex justify-center"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <p className="text-[#0ea5e9] font-medium mb-4 text-lg">
            Bonjour, je suis
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Océan Barras</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
            Développeur Full-Stack <span className="text-[#0ea5e9]">.NET</span> |{' '}
            <span className="text-[#8b5cf6]">Azure</span> |{' '}
            <span className="text-[#0ea5e9]">React</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Plus de 5 ans d&apos;expérience dans le développement d&apos;applications
            d&apos;entreprise robustes et évolutives. Spécialisé dans l&apos;écosystème
            Microsoft et les architectures cloud modernes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#contact" className="btn-primary">
              Me contacter
            </a>
            <a href="#portfolio" className="btn-secondary">
              Voir mes projets
            </a>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="mailto:ocean.barras@hotmail.com"
              className="text-gray-400 hover:text-[#0ea5e9] transition-colors"
              aria-label="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/ocean-barras"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0ea5e9] transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </a>
            <a
              href="tel:418-520-5929"
              className="text-gray-400 hover:text-[#0ea5e9] transition-colors"
              aria-label="Téléphone"
            >
              <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <FontAwesomeIcon icon={faChevronDown} className="w-6 h-6 text-gray-400" />
          </div>
      </div>
    </section>
  );
}
