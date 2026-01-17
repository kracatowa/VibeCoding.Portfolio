import React from 'react';
import type { LinkItem } from './DemoHeader';

export default function DemoFooter({ links }: { links?: LinkItem[] }) {
  return (
    <footer className="border-t border-slate-800/30 py-5 px-5 text-center bg-gradient-to-t from-teal-500/5 to-transparent">
      <p className="m-0 text-sm text-slate-100">
        © {new Date().getFullYear()} Océan Barras — Demo site
      </p>
      {links && links.length > 0 && (
        <div className="flex gap-3 justify-center mt-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-slate-100 no-underline text-sm opacity-85 hover:opacity-100 hover:text-sky-500 transition-colors">{l.label}</a>
          ))}
        </div>
      )}
    </footer>
  );
}
