import React from 'react';
import type { LinkItem } from './DemoHeader';

export default function DemoFooter({ links }: { links?: LinkItem[] }) {
  return (
    <footer className="border-t-2 border-stone-200 py-8 px-6 text-center bg-warm-50">
      <p className="m-0 text-sm text-stone-600 font-light">
        © {new Date().getFullYear()} Océan Barras — Demo
      </p>
      {links && links.length > 0 && (
        <div className="flex gap-4 justify-center mt-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-stone-500 no-underline text-sm hover:text-terracotta-600 transition-colors">{l.label}</a>
          ))}
        </div>
      )}
    </footer>
  );
}
