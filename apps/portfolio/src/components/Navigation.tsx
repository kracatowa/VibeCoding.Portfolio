'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/projets', label: 'Projets' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory-50/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold text-dustyBlue-600 hover:text-dustyBlue-700 transition-colors"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Océan Barras
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-dustyBlue-600'
                    : 'text-stone-600 hover:text-dustyBlue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-4 py-2 rounded-md text-sm font-medium bg-dustyBlue-600 text-white hover:bg-dustyBlue-700 transition-colors"
            >
              Me contacter
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-dustyBlue-600 transition-colors"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-dustyBlue-600'
                      : 'text-stone-600 hover:text-dustyBlue-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex justify-center px-4 py-2 rounded-md text-sm font-medium bg-dustyBlue-600 text-white hover:bg-dustyBlue-700 transition-colors"
              >
                Me contacter
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
