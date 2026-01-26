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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold">Projets</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Découvrez mes réalisations en développement .NET, cloud Azure et intégration
            de données. Chaque projet présente le problème résolu, la solution technique
            et les résultats obtenus.
          </p>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-terracotta-600 uppercase tracking-wider mb-4">
            Projet en vedette
          </h2>
          <article className="bg-white/60 p-8 rounded-lg border-2 border-dustyBlue-200 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-sage-100 text-sage-700 font-medium">
                    Démo interactive
                  </span>
                  <span className="text-xs text-stone-500">{project.category}</span>
                </div>
                <h3 className="text-2xl font-semibold text-stone-800 mb-3">
                  {project.title}
                </h3>
                <p className="text-stone-600 mb-4">{project.summary}</p>
                <p className="text-sm text-stone-500 mb-6">
                  <strong className="text-stone-700">Problème:</strong>{' '}
                  {project.problem}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-stone-100 px-3 py-1 rounded-md text-xs text-stone-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-stone-200">
              <Link
                href={`/projets/${project.slug}`}
                className="inline-flex items-center justify-center px-5 py-2 rounded-md text-sm font-medium bg-dustyBlue-600 text-white hover:bg-dustyBlue-700 transition-colors"
              >
                Voir l'étude de cas complète
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
              </Link>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2 rounded-md text-sm font-medium border border-dustyBlue-600 text-dustyBlue-700 hover:bg-dustyBlue-50 transition-colors"
              >
                Démo interactive
                <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3 ml-2" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Experience Summary */}
      <section className="py-16 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-dustyBlue-600 mb-2">5+</div>
              <div className="text-stone-600">Années d'expérience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-dustyBlue-600 mb-2">5000+</div>
              <div className="text-stone-600">Transactions/jour traitées</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-dustyBlue-600 mb-2">30+</div>
              <div className="text-stone-600">Filiales intégrées</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-dustyBlue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl font-light mb-4 text-white"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Vous avez un projet similaire?
          </h2>
          <p className="text-dustyBlue-100 mb-8 max-w-xl mx-auto">
            Je peux vous aider à résoudre vos défis d'intégration et de développement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-md text-base font-medium bg-white text-dustyBlue-700 hover:bg-dustyBlue-50 transition-colors"
          >
            Discutons de votre projet
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
