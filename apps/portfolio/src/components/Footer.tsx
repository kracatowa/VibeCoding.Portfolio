import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const footerLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/projets', label: 'Projets' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'mailto:ocean.barras@hotmail.com', icon: faEnvelope, label: 'Email' },
  { href: 'tel:418-520-5929', icon: faPhone, label: 'Téléphone' },
  { href: 'https://linkedin.com/in/ocean-barras', icon: faLinkedin, label: 'LinkedIn' },
  { href: 'https://github.com/ocean-barras', icon: faGithub, label: 'GitHub' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-100 border-t border-zinc-800 text-zinc-400 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-medium text-zinc-50 hover:text-cyan-400 transition-colors tracking-wide"
            >
              Océan Barras
            </Link>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              Développeur Web & Cloud Senior en modernisation cloud, automatisation et intégration de données.
              Basé à Québec, QC.
            </p>
            <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs">
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
              </svg>
              IA-Assisté
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-6">
              N A V I G A T I O N
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-6">
              C O N T A C T
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:ocean.barras@hotmail.com"
                  className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-3"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-zinc-600" />
                  ocean.barras@hotmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:418-520-5929"
                  className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-3"
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-zinc-600" />
                  418-520-5929
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ocean-barras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-3"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 text-zinc-600" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-zinc-600">
              © {currentYear} Océan Barras. Tous droits réservés.
            </p>
            <p className="text-xs text-zinc-600">
              Développement assisté par intelligence artificielle pour une livraison plus rapide
            </p>
          </div>
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-zinc-600 hover:text-cyan-400 transition-colors"
                aria-label={link.label}
              >
                <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
