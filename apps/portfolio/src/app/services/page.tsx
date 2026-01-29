import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faCloud,
  faDatabase,
  faCogs,
  faCheckCircle,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata(
  'services',
  'Services de développement Web & Cloud',
  'Services de développement .NET, Azure, intégration de données et automatisation. Consultant freelance à Québec pour PME et startups.',
  ['services', 'consultant', 'freelance', 'développement web', 'développement cloud']
);

const services = [
  {
    icon: faCode,
    title: 'Développement .NET / C#',
    description:
      'Applications d\'entreprise robustes et évolutives avec .NET 9, ASP.NET Core et les meilleures pratiques de l\'industrie.',
    features: [
      'API REST conformes aux standards',
      'Architecture CQRS et microservices',
      'Authentification OAuth2 / JWT',
      'Tests unitaires et d\'intégration',
      'Code review et bonnes pratiques',
    ],
    technologies: ['.NET 9', 'C#', 'ASP.NET Core', 'Entity Framework', 'MS SQL'],
  },
  {
    icon: faCloud,
    title: 'Cloud Azure & DevOps',
    description:
      'Architecture cloud moderne avec Azure, déploiement continu et infrastructure as code pour des applications fiables et scalables.',
    features: [
      'Architecture cloud Azure',
      'CI/CD avec Azure DevOps',
      'Conteneurisation Docker',
      'Orchestration Kubernetes',
      'Monitoring et alerting',
    ],
    technologies: ['Azure', 'Docker', 'Kubernetes', 'Azure DevOps', 'Terraform'],
  },
  {
    icon: faDatabase,
    title: 'Intégration de données',
    description:
      'Connexion et synchronisation de vos sources de données. Extraction, transformation et chargement (ETL) pour centraliser vos informations.',
    features: [
      'Connexion multi-sources (Salesforce, HubSpot, etc.)',
      'Transformation et nettoyage des données',
      'Synchronisation en temps réel',
      'Export CSV, JSON, bases de données',
      'Planification automatique',
    ],
    technologies: ['REST API', 'Kafka', 'SQL', 'Python', 'Node.js'],
  },
  {
    icon: faCogs,
    title: 'Automatisation & Modernisation',
    description:
      'Automatisation des processus manuels et modernisation des systèmes legacy pour gagner en efficacité et réduire les coûts.',
    features: [
      'Remplacement des processus manuels',
      'Migration de systèmes legacy',
      'Intégration avec systèmes existants',
      'Scripts et outils d\'automatisation',
      'Documentation technique',
    ],
    technologies: ['Python', 'PowerShell', '.NET', 'Azure Functions', 'Logic Apps'],
  },
];

const process_steps = [
  {
    step: 1,
    title: 'Découverte',
    description: 'Analyse de vos besoins et objectifs pour comprendre votre contexte.',
  },
  {
    step: 2,
    title: 'Proposition',
    description: 'Présentation d\'une solution technique adaptée avec estimation et délais.',
  },
  {
    step: 3,
    title: 'Développement',
    description: 'Réalisation itérative avec points de contrôle réguliers.',
  },
  {
    step: 4,
    title: 'Livraison',
    description: 'Déploiement, documentation et transfert de connaissances.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-6 py-12 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
            E X P E R T I S E
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-zinc-50 mb-6">
            Services
          </h1>
          <div className="w-16 h-px bg-cyan-400 mx-auto mb-8"></div>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-6">
            Je propose des services de développement sur mesure pour les PME et startups
            qui cherchent à moderniser leurs systèmes ou développer de nouvelles applications.
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 7H7v6h6V7z" />
              <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
            </svg>
            Tous mes services incluent l'utilisation d'outils IA pour accélérer le développement
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <article
                key={index}
                className="group bg-dark-100 p-8 rounded border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-xs font-mono text-cyan-400/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-zinc-600 group-hover:text-cyan-400 transition-colors">
                        <FontAwesomeIcon icon={service.icon} className="w-5 h-5" />
                      </div>
                      <h2 className="text-lg font-medium text-zinc-200">{service.title}</h2>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-500 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="w-4 h-4 text-emerald-500/70 mt-0.5 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-transparent border border-zinc-800 px-2 py-1 rounded text-xs text-zinc-500 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
              P R O C E S S U S
            </p>
            <h2 className="text-3xl font-light text-zinc-50 mb-4">
              Mon processus
            </h2>
            <p className="text-zinc-500">
              Une approche structurée pour des projets réussis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process_steps.map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-12 h-12 border border-cyan-400/50 text-cyan-400 rounded flex items-center justify-center text-lg font-mono mx-auto mb-4 group-hover:bg-cyan-400 group-hover:text-dark-400 transition-all duration-300">
                  {String(item.step).padStart(2, '0')}
                </div>
                <h3 className="font-medium text-zinc-200 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16 px-6 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="bg-dark-100 border border-zinc-800 p-8 rounded text-center">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
              T A R I F S
            </p>
            <h2 className="text-2xl font-light text-zinc-50 mb-4">
              Tarification transparente
            </h2>
            <p className="text-zinc-500 mb-6 leading-relaxed">
              Je propose des taux abordables adaptés aux budgets des PME et startups.
              Chaque projet est unique — contactez-moi pour obtenir une estimation gratuite
              basée sur vos besoins spécifiques.
            </p>
            <ul className="text-sm text-zinc-400 mb-6 space-y-2">
              <li className="flex items-center justify-center gap-2">
                <span className="text-emerald-400">✓</span> Estimation gratuite et sans engagement
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-emerald-400">✓</span> Prix fixe ou à l'heure selon le projet
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-emerald-400">✓</span> Aucun coût caché
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-emerald-400">✓</span> Développement accéléré grâce à l'IA
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-zinc-800 bg-dark-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
            C O N T A C T
          </p>
          <h2 className="text-3xl font-light mb-6 text-zinc-50">
            Discutons de votre projet
          </h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto">
            Expliquez-moi vos besoins et je vous proposerai une solution adaptée.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded text-sm font-medium border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-400 transition-all duration-300"
          >
            Obtenir une estimation gratuite
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
