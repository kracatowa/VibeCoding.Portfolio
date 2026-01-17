import React from 'react';
import Logo from './Logo';

export type LinkItem = { href: string; label: string };

export default function DemoHeader({ navLinks }: { navLinks?: LinkItem[] }) {
  const defaultLinks: LinkItem[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];
  const links = navLinks ?? defaultLinks;

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-gradient-to-b from-slate-900/90 to-slate-900/80 backdrop-blur-md sticky top-0 z-50 w-full shadow-lg">
      <div className="flex items-center justify-between gap-8 w-[1400px] mx-auto">
        <Logo />

        <nav aria-label="Demo navigation" className="flex gap-3 items-center">
          <ul className="flex gap-6 list-none m-0 p-0 items-center flex-nowrap whitespace-nowrap">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-slate-100 no-underline text-base font-semibold px-3 py-1.5 rounded transition-colors duration-150 opacity-90 hover:text-sky-500 hover:opacity-100">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
