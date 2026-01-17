import React from 'react';
import DemoHeader, { LinkItem } from './DemoHeader';
import DemoFooter from './DemoFooter';

export function DemoLayout({ children, headerLinks, footerLinks }: { children: React.ReactNode; headerLinks?: LinkItem[]; footerLinks?: LinkItem[] }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DemoHeader navLinks={headerLinks} />
      <main className="flex-1 py-7 px-5 max-w-6xl mx-auto w-full">
        {children}
      </main>
      <DemoFooter links={footerLinks} />
    </div>
  );
}

export default DemoLayout;
