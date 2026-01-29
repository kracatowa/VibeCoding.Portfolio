'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section {
    id: string;
    label: string;
}

interface SectionNavProps {
    sections: Section[];
}

export default function SectionNav({ sections }: SectionNavProps) {
    const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                            setActiveSection(section.id);
                        }
                    });
                },
                {
                    threshold: [0.3, 0.5, 0.7],
                    rootMargin: '-10% 0px -10% 0px',
                }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-6">
            {sections.map((section, index) => {
                const isActive = activeSection === section.id;

                return (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="group flex items-center gap-3"
                        aria-label={`Aller à ${section.label}`}
                    >
                        {/* Indicator */}
                        <div className="relative flex items-center justify-center">
                            <motion.div
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-cyan-400' : 'bg-zinc-700 group-hover:bg-zinc-500'
                                    }`}
                                animate={{
                                    scale: isActive ? 1.5 : 1,
                                }}
                                transition={{ duration: 0.2 }}
                            />
                            {isActive && (
                                <motion.div
                                    className="absolute w-4 h-4 rounded-full border border-cyan-400/50"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </div>

                        {/* Label */}
                        <span
                            className={`text-xs font-medium uppercase tracking-wider transition-all duration-300 ${isActive
                                    ? 'text-cyan-400'
                                    : 'text-zinc-600 group-hover:text-zinc-400'
                                }`}
                        >
                            {section.label}
                        </span>

                        {/* Number */}
                        <span
                            className={`text-[10px] font-mono transition-all duration-300 ${isActive ? 'text-cyan-400/60' : 'text-zinc-700'
                                }`}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </button>
                );
            })}

            {/* Vertical line */}
            <div className="absolute left-[3px] top-0 bottom-0 w-px bg-zinc-800 -z-10" />
        </nav>
    );
}
