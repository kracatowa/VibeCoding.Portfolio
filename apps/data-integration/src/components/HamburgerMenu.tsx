'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface MenuLink {
  href?: string;
  label: string;
  icon?: any;
  children?: MenuLink[];
}

interface HamburgerMenuProps {
  menuItems?: MenuLink[];
}

export default function HamburgerMenu({ menuItems = [] }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleSection = (label: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleMenu}
        className="p-2.5 text-charcoal-700 hover:text-charcoal-900 hover:bg-stone-100 rounded-lg transition-all duration-200"
        aria-label="Menu"
      >
        <FontAwesomeIcon icon={faBars} className="text-lg" />
      </button>
    );
  }

  return (
    <>
      {/* Close button */}
      <button
        onClick={toggleMenu}
        className="p-2.5 text-charcoal-700 hover:text-charcoal-900 hover:bg-stone-100 rounded-lg transition-all duration-200"
        aria-label="Close Menu"
      >
        <FontAwesomeIcon icon={faTimes} className="text-lg" />
      </button>

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        style={{ zIndex: 40 }}
        onClick={closeMenu}
      />

      {/* Side menu */}
      <div
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-vintage-xl border-l border-stone-200 transform transition-transform duration-300 ease-in-out"
        style={{ zIndex: 50 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-2 border-b border-stone-200">
            <h2 className="text-xl font-semibold text-charcoal-900">Menu</h2>
            <button 
              onClick={closeMenu} 
              className="p-2 text-stone-600 hover:text-charcoal-900 hover:bg-stone-100 rounded-lg transition-all duration-200"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Menu items */}
          <nav className="px-4 py-3 bg-stone-50">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleSection(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-charcoal-700 bg-white hover:bg-stone-100 rounded-lg transition-all duration-200 group border border-stone-200"
                      >
                        <span className="flex items-center gap-3 font-medium">
                          {item.icon && <FontAwesomeIcon icon={item.icon} className="text-terracotta-500" />}
                          {item.label}
                        </span>
                        <FontAwesomeIcon
                          icon={expandedSections[item.label] ? faChevronDown : faChevronRight}
                          className={`text-sm text-stone-500 group-hover:text-charcoal-700 transition-all duration-200 ${
                            expandedSections[item.label] ? 'rotate-0' : ''
                          }`}
                        />
                      </button>
                      {expandedSections[item.label] && (
                        <div className="ml-4 mt-1 pl-4 border-l-2 border-stone-200 space-y-1">
                          {item.children.map((child) => (
                            child.href && (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={closeMenu}
                                className="flex items-center gap-3 px-4 py-2.5 text-stone-600 bg-stone-50 hover:text-charcoal-900 hover:bg-stone-100 rounded-lg transition-all duration-200"
                              >
                                {child.icon && <FontAwesomeIcon icon={child.icon} className="text-sm" />}
                                {child.label}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    item.href && (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-3 text-charcoal-700 bg-white hover:text-charcoal-900 hover:bg-stone-100 rounded-lg transition-all duration-200 font-medium border border-stone-200"
                      >
                        {item.icon && <FontAwesomeIcon icon={item.icon} className="text-terracotta-500" />}
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-stone-200">
            <p className="text-xs text-stone-500 text-center">
              Data Integration Hub
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
