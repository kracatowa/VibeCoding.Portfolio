"use client";

import React, { useRef } from 'react';

export default function Logo({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleLoad = () => {
    if (svgRef.current) svgRef.current.style.display = 'none';
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    if (svgRef.current) svgRef.current.style.display = 'inline-block';
  };

  const basePath = typeof window !== 'undefined' && (window as any).__NEXT_DATA__?.props?.pageProps?.basePath 
    ? (window as any).__NEXT_DATA__.props.pageProps.basePath 
    : process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <a href="/" aria-label="Océan Barras" className={`flex items-center gap-3 no-underline text-slate-100 ${className ?? ''}`}>
      <img src={`${basePath}/wave-logo.png`} alt="Océan Barras" className="w-10 h-10 shrink-0 rounded-lg object-cover" onLoad={handleLoad} onError={handleError} />
      <span className="font-bold text-base text-slate-100 md:hidden">OB</span>
      <span className="font-bold text-base text-slate-100 hidden md:inline">Océan Barras</span>
    </a>
  );
}
