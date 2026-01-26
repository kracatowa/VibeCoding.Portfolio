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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold">Services</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Je propose des services de développement sur mesure pour les PME et startups
            qui cherchent à moderniser leurs systèmes ou développer de nouvelles applications.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <article
                key={index}
                className="bg-white/60 p-8 rounded-lg border border-stone-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-dustyBlue-500 bg-dustyBlue-50 p-3 rounded-lg">
                    <FontAwesomeIcon icon={service.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-stone-800">{service.title}</h2>
                  </div>
                </div>

                <p className="text-stone-600 mb-6">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="w-4 h-4 text-sage-500 mt-0.5 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-200">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-stone-100 px-2 py-1 rounded text-xs text-stone-600"
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
      <section className="py-16 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-light mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <span className="text-dustyBlue-600 font-semibold">Mon processus</span>
            </h2>
            <p className="text-stone-600">
              Une approche structurée pour des projets réussis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process_steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-dustyBlue-600 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-terracotta-50 border border-terracotta-200 p-8 rounded-lg text-center">
            <h2
              className="text-2xl font-light mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <span className="text-terracotta-700 font-semibold">Tarification transparente</span>
            </h2>
            <p className="text-stone-600 mb-6">
              Je propose des taux abordables adaptés aux budgets des PME et startups.
              Chaque projet est unique — contactez-moi pour obtenir une estimation gratuite
              basée sur vos besoins spécifiques.
            </p>
            <ul className="text-sm text-stone-600 mb-6 space-y-1">
              <li>✓ Estimation gratuite et sans engagement</li>
              <li>✓ Prix fixe ou à l'heure selon le projet</li>
              <li>✓ Aucun coût caché</li>
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
            Discutons de votre projet
          </h2>
          <p className="text-dustyBlue-100 mb-8 max-w-xl mx-auto">
            Expliquez-moi vos besoins et je vous proposerai une solution adaptée.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-md text-base font-medium bg-white text-dustyBlue-700 hover:bg-dustyBlue-50 transition-colors"
          >
            Obtenir une estimation gratuite
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
