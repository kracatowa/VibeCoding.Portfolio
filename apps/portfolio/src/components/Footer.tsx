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
    <footer className="bg-stone-800 text-stone-300 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-semibold text-white hover:text-dustyBlue-300 transition-colors"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Océan Barras
            </Link>
            <p className="mt-3 text-sm text-stone-400">
              Développeur Web & Cloud Senior spécialisé en .NET, Azure et intégration de données.
              Basé à Québec, QC.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:ocean.barras@hotmail.com"
                  className="text-sm text-stone-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  ocean.barras@hotmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:418-520-5929"
                  className="text-sm text-stone-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                  418-520-5929
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ocean-barras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-500">
            © {currentYear} Océan Barras. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-stone-400 hover:text-white transition-colors"
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
