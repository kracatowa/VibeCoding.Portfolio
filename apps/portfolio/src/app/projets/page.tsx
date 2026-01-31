import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata(
  'projets',
  'Projets & Études de cas',
  'Portfolio de projets de développement .NET, Azure et intégration de données. Études de cas détaillées avec problématiques, solutions et résultats.',
  ['projets', 'portfolio', 'études de cas', 'réalisations']
);

const project = {
  slug: 'data-integration',
  title: 'Data Integration Hub',
  category: 'Intégration de données',
  summary:
    'Plateforme d\'intégration de données en temps réel avec extraction depuis Salesforce, HubSpot et Zendesk.',
  problem: 'Centraliser les données clients dispersées dans plusieurs CRM',
  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'React'],
  demoUrl: process.env.NEXT_PUBLIC_DATA_INTEGRATION_URL || 'https://ocean-barras-data-integration.vercel.app',
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-12rem)] flex flex-col justify-center mb-6 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light text-zinc-50 mb-6">
            Portfolio
          </h1>
          <div className="w-16 h-px bg-cyan-400 mx-auto mb-8"></div>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Découvrez mes réalisations en développement Modernisation cloud, Automatisation et Intégration de données. Chaque projet présente le problème résolu, la solution technique
            et les résultats obtenus.
          </p>
        </div>
      </section>

      {/* Featured Project */}
      <section className="min-h-screen flex flex-col justify-center py-12 px-6 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium text-cyan-400/70 uppercase tracking-[0.3em] mb-6">
            P R O J E T &nbsp; E N &nbsp; V E D E T T E
          </p>
          <article className="group bg-dark-100 p-8 rounded border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-mono text-cyan-400/60">01</span>
                  <span className="text-xs px-3 py-1 rounded border border-emerald-500/30 text-emerald-400 font-medium">
                    Démo interactive
                  </span>
                  <span className="text-xs px-3 py-1 rounded border border-emerald-500/30 text-emerald-400 font-medium">
                    IA-Assisted
                  </span>
                  <span className="text-xs text-zinc-600">{project.category}</span>
                </div>
                <h3 className="text-2xl font-light text-zinc-100 mb-4">
                  {project.title}
                </h3>
                <p className="text-zinc-400 mb-4 leading-relaxed">{project.summary}</p>
                <p className="text-sm text-zinc-500 mb-6">
                  <span className="text-zinc-400">Problème:</span>{' '}
                  {project.problem}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-transparent border border-zinc-800 px-3 py-1 rounded text-xs text-zinc-500 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-800">
              <Link
                href={`/projets/${project.slug}`}
                className="inline-flex items-center justify-center px-5 py-2 rounded text-sm font-medium border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-400 transition-all duration-300"
              >
                Voir l'étude de cas complète
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
              </Link>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2 rounded text-sm font-medium border border-zinc-700 text-zinc-300 hover:border-zinc-500 transition-all duration-300"
              >
                Démo interactive
                <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3 ml-2" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="min-h-[calc(100vh-24rem)] flex flex-col justify-center py-20 px-6 border-t border-zinc-800 bg-dark-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
            C O N T A C T
          </p>
          <h2 className="text-3xl font-light mb-6 text-zinc-50">
            Vous avez un projet similaire?
          </h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto">
            Je peux vous aider à résoudre vos défis d'intégration et de développement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded text-sm font-medium border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-400 transition-all duration-300"
          >
            Discutons de votre projet
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
