'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud, faCode, faDatabase, faRocket } from '@fortawesome/free-solid-svg-icons';
import ProjectCarousel from '@/components/ProjectCarousel';
import SectionNav from '@/components/SectionNav';

const highlights = [
    {
        icon: faCode,
        title: '.NET & C#',
        description: 'Applications d\'entreprise robustes avec les dernières technologies Microsoft',
    },
    {
        icon: faCloud,
        title: 'Cloud Azure',
        description: 'Architecture cloud moderne, CI/CD et déploiement Kubernetes',
    },
    {
        icon: faDatabase,
        title: 'Intégration de données',
        description: 'Connexion et synchronisation de vos sources de données',
    },
    {
        icon: faRocket,
        title: 'Automatisation',
        description: 'Automatisation des processus pour gagner en efficacité',
        badge: 'IA',
    },
];

const sections = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'contact', label: 'Contact' },
];

export default function HomePageClient() {
    return (
        <>
            <SectionNav sections={sections} />

            {/* Hero Section */}
            <section id="accueil" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 py-12 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.3em] mb-6">
                        D É V E L O P P E U R &nbsp; W E B &nbsp; & &nbsp; C L O U D
                    </p>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-8 tracking-tight text-zinc-50">
                        Océan Barras
                    </h1>
                    <div className="w-16 h-px bg-cyan-400 mx-auto mb-8"></div>
                    <p className="text-lg md:text-xl text-zinc-400 font-light mb-6 max-w-2xl mx-auto leading-relaxed">
                        Spécialisé en <span className="text-zinc-200">Modernisation cloud</span>,{' '}
                        <span className="text-zinc-200">Automatisation</span> et{' '}
                        <span className="text-zinc-200">Intégration de données</span>
                    </p>
                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 7H7v6h6V7z" />
                            <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                        </svg>
                        Développement assisté par IA
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/projets"
                            className="inline-flex items-center px-6 py-3 rounded text-sm font-medium border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-400 transition-all duration-300"
                        >
                            Voir mes projets
                            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 rounded text-sm font-medium border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-all duration-300"
                        >
                            Me contacter
                        </Link>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section id="services" className="min-h-screen flex flex-col justify-center px-6 py-12 border-t border-zinc-800">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="text-center mb-16">
                        <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
                            S E R V I C E S
                        </p>
                        <h2 className="text-3xl md:text-4xl font-light text-zinc-50 mb-6">
                            Ce que je peux faire pour vous
                        </h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto mb-4">
                            Plus de 5 ans d'expérience dans le développement d'applications d'entreprise
                            pour des clients comme Industrielle Alliance et le Ministère de la Santé.
                        </p>
                        <div className="inline-flex items-center px-4 py-2 rounded border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm mt-4">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 7H7v6h6V7z" />
                                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                            </svg>
                            J'utilise l'IA pour accélérer le développement, la documentation, les tests et les revues de code
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-dark-100 p-6 rounded border border-zinc-800 hover:border-cyan-400/50 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-mono text-cyan-400/60">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {item.badge && (
                                        <span className="text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 font-medium">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="text-zinc-500 group-hover:text-cyan-400 mb-4 transition-colors">
                                    <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-medium text-zinc-200 mb-2">{item.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Project Carousel */}
            <section id="realisations" className="min-h-screen flex flex-col justify-center px-6 py-12 border-t border-zinc-800">
                <div className="max-w-5xl mx-auto w-full">
                    <div className="text-center mb-12">
                        <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
                            P R O J E T S &nbsp; E N &nbsp; V E D E T T E
                        </p>
                        <h2 className="text-3xl md:text-4xl font-light text-zinc-50">
                            Mes réalisations
                        </h2>
                    </div>

                    <ProjectCarousel />
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="min-h-screen flex flex-col justify-center px-6 py-12 border-t border-zinc-800 bg-dark-100">
                <div className="max-w-4xl mx-auto text-center w-full">
                    <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
                        C O N T A C T
                    </p>
                    <h2 className="text-3xl md:text-4xl font-light mb-6 text-zinc-50">
                        Prêt à démarrer votre projet?
                    </h2>
                    <p className="text-zinc-500 mb-10 max-w-xl mx-auto">
                        Discutons de vos besoins et voyons comment je peux vous aider à concrétiser
                        votre vision.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 rounded text-sm font-medium border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-400 transition-all duration-300"
                    >
                        Contactez-moi
                        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </section>
        </>
    );
}
