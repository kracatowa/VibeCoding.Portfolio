import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faExternalLinkAlt,
  faCheckCircle,
  faLightbulb,
  faBalanceScale,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Data Integration Hub - Étude de cas',
  description:
    'Étude de cas: Plateforme d\'intégration de données en temps réel avec extraction depuis Salesforce, HubSpot et Zendesk. Architecture, décisions techniques et résultats.',
  openGraph: {
    title: 'Data Integration Hub - Étude de cas | Océan Barras',
    description:
      'Plateforme d\'intégration de données multi-sources avec monitoring en temps réel.',
    type: 'article',
  },
};

const caseStudyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Data Integration Hub - Étude de cas',
  author: {
    '@type': 'Person',
    name: 'Océan Barras',
  },
  datePublished: '2026-01-15',
  description:
    'Plateforme d\'intégration de données en temps réel avec extraction depuis Salesforce, HubSpot et Zendesk.',
};

export default function DataIntegrationCaseStudy() {
  const demoUrl =
    process.env.NEXT_PUBLIC_DATA_INTEGRATION_URL ||
    'https://ocean-barras-data-integration.vercel.app';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />

      {/* Header */}
      <section className="py-12 px-6 border-b border-stone-200">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/projets"
            className="inline-flex items-center text-sm text-dustyBlue-600 hover:text-dustyBlue-700 mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
            Retour aux projets
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-sage-100 text-sage-700 font-medium">
              Démo interactive
            </span>
            <span className="text-xs text-stone-500">Intégration de données</span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-light mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold">Data Integration Hub</span>
          </h1>

          <p className="text-lg text-stone-600 mb-6">
            Plateforme d'intégration de données en temps réel permettant l'extraction,
            la transformation et l'export de données depuis plusieurs sources CRM.
          </p>

          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 rounded-md text-sm font-medium bg-dustyBlue-600 text-white hover:bg-dustyBlue-700 transition-colors"
          >
            Voir la démo interactive
            <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3 ml-2" />
          </a>
        </div>
      </section>

      {/* Problem */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-stone-800 mb-6 flex items-center gap-3">
            <span className="text-terracotta-500">
              <FontAwesomeIcon icon={faLightbulb} className="w-6 h-6" />
            </span>
            Le problème
          </h2>

          <div className="bg-terracotta-50 border border-terracotta-200 p-6 rounded-lg mb-6">
            <p className="text-stone-700 leading-relaxed">
              Les entreprises utilisent souvent plusieurs CRM et outils (Salesforce, HubSpot,
              Zendesk) pour gérer leurs relations clients. Ces données sont{' '}
              <strong>dispersées</strong>, rendant difficile une vue unifiée des clients et
              compliquant les processus de reporting et d'analyse.
            </p>
          </div>

          <h3 className="font-semibold text-stone-800 mb-3">Défis identifiés:</h3>
          <ul className="space-y-2 text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-terracotta-500 mt-1">•</span>
              <span>
                Données clients fragmentées entre plusieurs plateformes
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terracotta-500 mt-1">•</span>
              <span>
                Extractions manuelles chronophages et sujettes aux erreurs
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terracotta-500 mt-1">•</span>
              <span>
                Absence de visibilité sur le statut des extractions
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terracotta-500 mt-1">•</span>
              <span>
                Difficulté à planifier des extractions récurrentes
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="py-12 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-stone-800 mb-6 flex items-center gap-3">
            <span className="text-sage-500">
              <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6" />
            </span>
            La solution
          </h2>

          <p className="text-stone-600 mb-8 leading-relaxed">
            J'ai développé une plateforme d'intégration de données offrant une interface
            intuitive pour extraire, transformer et exporter des données depuis plusieurs
            sources en temps réel.
          </p>

          <h3 className="font-semibold text-stone-800 mb-4">Fonctionnalités principales:</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Extraction multi-sources',
                desc: 'Connexion à Salesforce, HubSpot et Zendesk via leurs APIs respectives',
              },
              {
                title: 'Suivi en temps réel',
                desc: 'Visualisation des 4 étapes d\'extraction avec statuts animés',
              },
              {
                title: 'Templates configurables',
                desc: 'Sélection des champs à extraire via des modèles personnalisables',
              },
              {
                title: 'Planification automatique',
                desc: 'Programmation d\'extractions récurrentes par jour ou heure',
              },
              {
                title: 'Historique complet',
                desc: 'Consultation de toutes les extractions passées avec détails',
              },
              {
                title: 'Notifications',
                desc: 'Alertes en temps réel sur le succès ou l\'échec des extractions',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white/80 p-4 rounded-lg border border-stone-200">
                <h4 className="font-medium text-stone-800 mb-1">{feature.title}</h4>
                <p className="text-sm text-stone-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-stone-800 mb-6">Stack technique</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-stone-700 mb-3">Frontend</h3>
              <ul className="space-y-2">
                {['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS 4'].map(
                  (tech) => (
                    <li key={tech} className="flex items-center gap-2 text-sm text-stone-600">
                      <span className="w-2 h-2 bg-dustyBlue-500 rounded-full"></span>
                      {tech}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-stone-700 mb-3">Backend</h3>
              <ul className="space-y-2">
                {[
                  'Next.js API Routes',
                  'REST API',
                  'In-memory database (démo)',
                  'Polling temps réel',
                ].map((tech) => (
                  <li key={tech} className="flex items-center gap-2 text-sm text-stone-600">
                    <span className="w-2 h-2 bg-sage-500 rounded-full"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-stone-700 mb-3">Outils</h3>
              <ul className="space-y-2">
                {['pnpm (monorepo)', 'ESLint', 'Vercel (déploiement)', 'FontAwesome'].map(
                  (tech) => (
                    <li key={tech} className="flex items-center gap-2 text-sm text-stone-600">
                      <span className="w-2 h-2 bg-lavender-500 rounded-full"></span>
                      {tech}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Decisions */}
      <section className="py-12 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-stone-800 mb-6 flex items-center gap-3">
            <span className="text-dustyBlue-500">
              <FontAwesomeIcon icon={faBalanceScale} className="w-6 h-6" />
            </span>
            Décisions d'architecture
          </h2>

          <div className="space-y-6">
            <div className="bg-white/80 p-6 rounded-lg border border-stone-200">
              <h3 className="font-semibold text-stone-800 mb-2">
                Next.js avec App Router
              </h3>
              <p className="text-stone-600 text-sm mb-3">
                <strong>Pourquoi:</strong> L'App Router de Next.js 15 offre une meilleure
                structure pour les applications complexes avec Server Components et layouts
                imbriqués.
              </p>
              <p className="text-stone-500 text-sm">
                <strong>Alternative considérée:</strong> Pages Router traditionnel, mais moins
                flexible pour la gestion d'état côté serveur.
              </p>
            </div>

            <div className="bg-white/80 p-6 rounded-lg border border-stone-200">
              <h3 className="font-semibold text-stone-800 mb-2">
                Polling vs WebSocket pour le temps réel
              </h3>
              <p className="text-stone-600 text-sm mb-3">
                <strong>Pourquoi:</strong> Le polling simplifie le déploiement sur Vercel et
                suffit pour des mises à jour toutes les 1.5 secondes.
              </p>
              <p className="text-stone-500 text-sm">
                <strong>Trade-off:</strong> Plus de requêtes réseau, mais architecture plus
                simple et compatible serverless.
              </p>
            </div>

            <div className="bg-white/80 p-6 rounded-lg border border-stone-200">
              <h3 className="font-semibold text-stone-800 mb-2">
                Base de données en mémoire pour la démo
              </h3>
              <p className="text-stone-600 text-sm mb-3">
                <strong>Pourquoi:</strong> Permet une démo fonctionnelle sans infrastructure
                externe, avec reset automatique.
              </p>
              <p className="text-stone-500 text-sm">
                <strong>Production:</strong> Remplacement par PostgreSQL ou MongoDB selon les
                besoins de persistance.
              </p>
            </div>

            <div className="bg-white/80 p-6 rounded-lg border border-stone-200">
              <h3 className="font-semibold text-stone-800 mb-2">
                Retry avec exponential backoff
              </h3>
              <p className="text-stone-600 text-sm mb-3">
                <strong>Pourquoi:</strong> Améliore la résilience face aux erreurs réseau
                transitoires, respecte les limites de taux des APIs.
              </p>
              <p className="text-stone-500 text-sm">
                <strong>Implémentation:</strong> Full jitter et support de l'en-tête
                Retry-After pour les erreurs 429.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-stone-800 mb-6 flex items-center gap-3">
            <span className="text-amber-500">
              <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />
            </span>
            Résultats
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { value: '4', label: 'Étapes d\'extraction visualisées' },
              { value: '3', label: 'Sources CRM supportées' },
              { value: '<2s', label: 'Temps de réponse UI' },
              { value: '100%', label: 'Couverture TypeScript' },
            ].map((stat, i) => (
              <div key={i} className="text-center bg-white/60 p-6 rounded-lg border border-stone-200">
                <div className="text-3xl font-bold text-dustyBlue-600 mb-1">{stat.value}</div>
                <div className="text-sm text-stone-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-sage-50 border border-sage-200 p-6 rounded-lg">
            <h3 className="font-semibold text-sage-800 mb-3">Impacts démontrés:</h3>
            <ul className="space-y-2 text-sage-700">
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 mt-1 shrink-0" />
                <span>Interface intuitive réduisant le besoin de formation</span>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 mt-1 shrink-0" />
                <span>Feedback visuel en temps réel améliorant l'expérience utilisateur</span>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 mt-1 shrink-0" />
                <span>Architecture extensible pour ajouter de nouvelles sources</span>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 mt-1 shrink-0" />
                <span>Gestion robuste des erreurs avec notifications utilisateur</span>
              </li>
            </ul>
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
            Besoin d'une solution similaire?
          </h2>
          <p className="text-dustyBlue-100 mb-8 max-w-xl mx-auto">
            Je peux vous aider à centraliser vos données et automatiser vos processus
            d'intégration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md text-base font-medium bg-white text-dustyBlue-700 hover:bg-dustyBlue-50 transition-colors"
            >
              Discuter de votre projet
            </Link>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md text-base font-medium border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              Voir la démo
              <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
