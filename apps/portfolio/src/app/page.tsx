import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCloud, faCode, faDatabase, faRocket } from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Développeur Web & Cloud Senior | .NET, Azure, Intégration de données',
  description:
    'Océan Barras - Développeur Web & Cloud Senior à Québec. Spécialisé en .NET, Azure et intégration de données. Plus de 5 ans d\'expérience. Taux abordables pour PME et startups.',
  openGraph: {
    title: 'Océan Barras | Développeur Web & Cloud Senior',
    description:
      'Développeur spécialisé en .NET, Azure et intégration de données. Taux abordables pour PME et startups à Québec.',
  },
};

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
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-light mb-6 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold">Océan Barras</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 font-light mb-4">
            Développeur Web & Cloud Senior
          </p>
          <p className="text-lg md:text-xl text-stone-500 font-light mb-8 max-w-2xl mx-auto">
            Spécialisé en <strong className="text-stone-700">.NET</strong>,{' '}
            <strong className="text-stone-700">Azure</strong> et{' '}
            <strong className="text-stone-700">intégration de données</strong> pour les PME et startups.
          </p>
          <p className="text-base text-terracotta-600 font-medium mb-10">
            🎯 Taux abordables • Basé à Québec, QC
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projets"
              className="inline-flex items-center px-6 py-3 rounded-md text-base font-medium bg-dustyBlue-600 text-white hover:bg-dustyBlue-700 transform transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              Voir mes projets
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-md text-base font-medium border-2 border-dustyBlue-600 text-dustyBlue-700 hover:bg-dustyBlue-50 transform transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-6 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-light mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <span className="text-dustyBlue-600 font-semibold">Ce que je peux faire pour vous</span>
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Plus de 5 ans d'expérience dans le développement d'applications d'entreprise
              pour des clients comme Industrielle Alliance et le Ministère de la Santé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white/60 p-6 rounded-lg border border-stone-200 hover:shadow-md transition-shadow"
              >
                <div className="text-dustyBlue-500 mb-4">
                  <FontAwesomeIcon icon={item.icon} className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-light mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <span className="text-dustyBlue-600 font-semibold">Projet en vedette</span>
            </h2>
          </div>

          <div className="bg-white/60 p-8 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-stone-800">Data Integration Hub</h3>
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-sage-100/60 text-sage-700">
                Démo interactive
              </span>
            </div>
            <p className="text-stone-600 mb-6">
              Plateforme d'intégration de données en temps réel avec extraction depuis
              Salesforce, HubSpot et Zendesk. Interface de monitoring avec étapes visuelles
              et planification automatique.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'React'].map((tech) => (
                <span
                  key={tech}
                  className="bg-stone-100 px-3 py-1 rounded-md text-xs text-stone-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/projets/data-integration"
                className="inline-flex items-center justify-center px-5 py-2 rounded-md text-sm font-medium bg-dustyBlue-600 text-white hover:bg-dustyBlue-700 transition-colors"
              >
                Voir l'étude de cas
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
              </Link>
              <a
                href={process.env.NEXT_PUBLIC_DATA_INTEGRATION_URL || 'https://ocean-barras-data-integration.vercel.app'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2 rounded-md text-sm font-medium border border-dustyBlue-600 text-dustyBlue-700 hover:bg-dustyBlue-50 transition-colors"
              >
                Démo interactive →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-dustyBlue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-light mb-4 text-white"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Prêt à démarrer votre projet?
          </h2>
          <p className="text-dustyBlue-100 mb-8 max-w-xl mx-auto">
            Discutons de vos besoins et voyons comment je peux vous aider à concrétiser
            votre vision.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-md text-base font-medium bg-white text-dustyBlue-700 hover:bg-dustyBlue-50 transform transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
          >
            Contactez-moi
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
