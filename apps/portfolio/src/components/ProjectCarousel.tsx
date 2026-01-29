'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Project {
    id: string;
    number: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    href: string;
    demoUrl?: string;
    badge?: string[];
}

const projects: Project[] = [
    {
        id: 'data-integration',
        number: '01',
        title: 'Data Integration Hub',
        description:
            'Plateforme d\'intégration de données en temps réel avec extraction depuis Salesforce, HubSpot et Zendesk. Interface de monitoring avec étapes visuelles et planification automatique.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'React'],
        image: '/data-integration.png',
        href: '/projets/data-integration',
        demoUrl: process.env.NEXT_PUBLIC_DATA_INTEGRATION_URL || 'https://ocean-barras-data-integration.vercel.app',
        badge: ['Démo interactive', 'IA-Assisted'],
    },
    // Ajouter d'autres projets ici
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
    }),
};

export default function ProjectCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            const next = prev + newDirection;
            if (next < 0) return projects.length - 1;
            if (next >= projects.length) return 0;
            return next;
        });
    }, []);

    useEffect(() => {
        if (!isAutoPlaying || projects.length <= 1) return;

        const interval = setInterval(() => {
            paginate(1);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, paginate]);

    const currentProject = projects[currentIndex];

    return (
        <div
            className="relative overflow-hidden rounded border border-zinc-800"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-400 via-dark-400/95 to-dark-400/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentProject.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xs font-mono text-cyan-400/60">{currentProject.number}</span>
                            {currentProject.badge && (
                                <div className="flex items-center gap-2 ml-auto flex-shrink-0 whitespace-nowrap">
                                    {currentProject.badge.map((badge, i) => (
                                        <span key={i} className="text-xs px-3 py-1 rounded border border-emerald-500/30 text-emerald-400 font-medium">
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-light text-zinc-50 mb-4">
                            {currentProject.title}
                        </h3>

                        <p className="text-zinc-400 mb-6 leading-relaxed max-w-2xl">
                            {currentProject.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {currentProject.tags.map((tech) => (
                                <span
                                    key={tech}
                                    className="bg-transparent border border-zinc-800 px-3 py-1 rounded text-xs text-zinc-500 font-mono"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-800">
                            <Link
                                href={currentProject.href}
                                className="inline-flex items-center justify-center px-5 py-2 rounded text-sm font-medium border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-400 transition-all duration-300"
                            >
                                Voir l'étude de cas
                                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
                            </Link>
                            {currentProject.demoUrl && (
                                <a
                                    href={currentProject.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-5 py-2 rounded text-sm font-medium border border-zinc-700 text-zinc-300 hover:border-zinc-500 transition-all duration-300"
                                >
                                    Démo interactive →
                                </a>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {projects.length > 1 && (
                <>
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded border border-zinc-700 bg-dark-400/80 text-zinc-400 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center"
                        aria-label="Projet précédent"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded border border-zinc-700 bg-dark-400/80 text-zinc-400 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center"
                        aria-label="Projet suivant"
                    >
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {projects.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-cyan-400 w-6'
                                : 'bg-zinc-700 hover:bg-zinc-600'
                                }`}
                            aria-label={`Aller au projet ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
