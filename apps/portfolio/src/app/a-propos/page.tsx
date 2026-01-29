import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBriefcase,
  faGraduationCap,
  faTrophy,
  faCode,
  faCloud,
  faDatabase,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata(
  'a-propos',
  'À propos - Mon parcours professionnel',
  'Océan Barras - Spécialisé en Modernisation cloud, Automatisation et Intégration de données. Développeur Web & Cloud Senior basé à Québec avec plus de 5 ans d\'expérience.',
  ['à propos', 'parcours', 'expérience', 'compétences', 'biographie']
);

const experiences = [
  {
    company: 'Entreprise du secteur financier',
    role: 'Développeur Web & Cloud (.NET / Azure)',
    period: '2023 – 2025',
    highlights: [
      'Développement de formulaires libre-service pour l\'intégration de données',
      'Création d\'outils d\'analyse et de reporting',
      'Automatisation de processus métier',
      'Contribution aux bonnes pratiques API et architecture',
    ],
  },
  {
    company: 'Entreprise du secteur assurance',
    role: 'Développeur Backend (.NET)',
    period: '2022',
    highlights: [
      'Modernisation de systèmes legacy',
      'Migration vers le cloud Azure',
      'Développement d\'APIs RESTful',
    ],
  },
  {
    company: 'Entreprise du secteur financier',
    role: 'Développeur Backend & Cloud (.NET / Azure)',
    period: '2020 – 2022',
    highlights: [
      'Modernisation de systèmes de paiements à haut volume',
      'Intégration de processus legacy avec systèmes modernes',
    ],
  },
  {
    company: 'Ministère (Secteur public)',
    role: 'Développeur (Java, JavaScript)',
    period: '2019 – 2020',
    highlights: [
      'Développement de fonctionnalités dans des applications métier complexes',
      'Maintenance d\'applications avec grandes bases de données',
    ],
  },
];

const skills = [
  {
    category: 'Langages & Frameworks',
    icon: faCode,
    items: ['.NET 9 (C#)', 'HTML/CSS', 'TypeScript', 'Python'],
  },
  {
    category: 'Cloud & DevOps',
    icon: faCloud,
    items: ['Azure', 'Docker', 'Kubernetes', 'CI/CD (Azure DevOps)', 'Git'],
  },
  {
    category: 'Bases de données',
    icon: faDatabase,
    items: ['MS SQL', 'MongoDB'],
  },
  {
    category: 'Architecture & Pratiques',
    icon: faCogs,
    items: ['API REST', 'Microservices', 'CQRS', 'OAuth2/JWT', 'Code Review'],
  },
  {
    category: 'Intelligence Artificielle',
    icon: faCogs,
    items: ['GitHub Copilot', 'ChatGPT', 'Documentation assistée', 'Tests automatisés', 'Revues de code'],
    badge: true,
  },
];

const values = [
  {
    title: 'Qualité du code',
    description:
      'Je privilégie un code propre, maintenable et bien documenté. Les bonnes pratiques ne sont pas optionnelles.',
  },
  {
    title: 'Communication transparente',
    description:
      'Je crois en une communication claire et régulière. Pas de surprises, pas de jargon inutile.',
  },
  {
    title: 'Approche pragmatique',
    description:
      'Je propose des solutions adaptées à vos besoins et votre budget, pas la technologie la plus récente juste pour le prestige.',
  },
  {
    title: 'Engagement envers les résultats',
    description:
      'Mon objectif est de livrer de la valeur concrète, pas simplement de compléter des tâches.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 py-12 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
              B I O G R A P H I E
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-zinc-50 mb-6">
              À propos
            </h1>
            <div className="w-16 h-px bg-cyan-400 mx-auto"></div>
          </div>

          <div className="bg-dark-100 p-8 rounded border border-zinc-800">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-lg text-zinc-400 mb-4 leading-relaxed">
                  Je suis <span className="text-zinc-200">Océan Barras</span>, développeur
                  Web & Cloud Senior basé à <span className="text-zinc-200">Québec, QC</span>.
                </p>
                <p className="text-zinc-400 mb-4 leading-relaxed">
                  Spécialisé en <span className="text-zinc-200">Modernisation cloud</span>, <span className="text-zinc-200">Automatisation</span> et <span className="text-zinc-200">Intégration de données</span>, j'aide les équipes à migrer leurs
                  systèmes, automatiser les processus métiers et centraliser les données critiques pour de meilleures décisions opérationnelles.
                </p>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  Fort de plus de <span className="text-zinc-200">5 ans d'expérience</span>, j'ai accompagné des organisations du secteur financier
                  et public dans la modernisation de leurs plateformes et la mise en place de pipelines de données fiables et observables.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://linkedin.com/in/ocean-barras"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded text-sm font-medium border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-400 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 rounded text-sm font-medium border border-zinc-700 text-zinc-300 hover:border-zinc-500 transition-all duration-300"
                  >
                    Me contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-6 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
              E X P E R T I S E
            </p>
            <h2 className="text-3xl font-light text-zinc-50">
              Compétences techniques
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`group bg-dark-100 p-6 rounded border transition-all duration-300 ${skill.badge ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-zinc-800 hover:border-zinc-700'
                  }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`transition-colors ${skill.badge ? 'text-emerald-400' : 'text-zinc-600 group-hover:text-cyan-400'
                    }`}>
                    <FontAwesomeIcon icon={skill.icon} className="w-4 h-4" />
                  </div>
                  {skill.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 font-medium">
                      NOUVEAU
                    </span>
                  )}
                </div>
                <h3 className={`font-medium text-sm mb-4 ${skill.badge ? 'text-emerald-400' : 'text-zinc-200'
                  }`}>{skill.category}</h3>
                <ul className="space-y-1">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-zinc-500">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 px-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
              P A R C O U R S
            </p>
            <h2 className="text-3xl font-light text-zinc-50 flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faBriefcase} className="w-6 h-6 text-zinc-600" />
              Expérience professionnelle
            </h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group bg-dark-100 p-6 rounded border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-cyan-400/60 mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-medium text-zinc-200">{exp.company}</h3>
                        <p className="text-cyan-400/80 text-sm">{exp.role}</p>
                      </div>
                      <span className="text-sm text-zinc-600 font-mono">{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-500">
                          <span className="text-emerald-500/70 mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 px-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
              F O R M A T I O N
            </p>
            <h2 className="text-3xl font-light text-zinc-50 flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faGraduationCap} className="w-6 h-6 text-zinc-600" />
              Éducation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-dark-100 p-6 rounded border border-zinc-800">
              <span className="text-xs font-mono text-cyan-400/60 mb-3 block">01</span>
              <h3 className="font-medium text-zinc-200 mb-2">
                DEC en informatique de gestion
              </h3>
              <p className="text-cyan-400/80 text-sm mb-1">Cégep Limoilou</p>
              <p className="text-zinc-600 text-sm font-mono">2017 – 2020</p>
            </div>

            <div className="bg-dark-100 p-6 rounded border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faTrophy} className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-400/60">DISTINCTION</span>
              </div>
              <h3 className="font-medium text-zinc-200 mb-2">Bourse Gilles Joncas (2021)</h3>
              <p className="text-zinc-500 text-sm">
                Remise pour excellence académique et performance en stage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
              P H I L O S O P H I E
            </p>
            <h2 className="text-3xl font-light text-zinc-50">
              Mes valeurs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-dark-100 p-6 rounded border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <span className="text-xs font-mono text-cyan-400/60 mb-3 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-medium text-zinc-200 mb-2">{value.title}</h3>
                <p className="text-sm text-zinc-500">{value.description}</p>
              </div>
            ))}
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
            Travaillons ensemble
          </h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto">
            Vous avez un projet? Discutons de comment je peux vous aider.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded text-sm font-medium border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-400 transition-all duration-300"
          >
            Me contacter
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
