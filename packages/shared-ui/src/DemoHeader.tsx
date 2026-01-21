import Logo from './Logo';
import type { ReactNode } from 'react';

export type LinkItem = { href: string; label: string };

export default function DemoHeader({ 
  navLinks, 
  rightContent 
}: { 
  navLinks?: LinkItem[];
  rightContent?: ReactNode;
}) {
  const defaultLinks: LinkItem[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];
  const links = navLinks ?? defaultLinks;

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b-2 border-stone-200 bg-white backdrop-blur-md sticky top-0 z-50 w-full shadow-vintage">
      <div className="shrink-0">
        <Logo />
      </div>

      <nav aria-label="Demo navigation" className="flex-1 flex gap-3 items-center justify-center">
        <ul className="flex gap-8 list-none m-0 p-0 items-center flex-nowrap whitespace-nowrap">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-stone-600 no-underline text-sm font-medium px-3 py-2 rounded transition-colors duration-200 hover:text-terracotta-600 hover:bg-terracotta-50">{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {rightContent && (
        <div className="shrink-0 ml-4">
          {rightContent}
        </div>
      )}
    </header>
  );
}
