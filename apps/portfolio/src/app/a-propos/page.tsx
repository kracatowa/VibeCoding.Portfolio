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
  'Océan Barras - Développeur Web & Cloud Senior avec plus de 5 ans d\'expérience. Parcours professionnel, compétences techniques et valeurs.',
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
    role: 'Développeur Web & Cloud (.NET / Azure)',
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
    items: ['.NET 9 (C#)', 'VB.NET', 'HTML/CSS', 'JavaScript/TypeScript', 'Python', 'Java'],
  },
  {
    category: 'Cloud & DevOps',
    icon: faCloud,
    items: ['Azure', 'Docker', 'Kubernetes', 'CI/CD (Azure DevOps)', 'Git'],
  },
  {
    category: 'Bases de données',
    icon: faDatabase,
    items: ['MS SQL', 'Azure SQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'Architecture & Pratiques',
    icon: faCogs,
    items: ['API REST', 'Microservices', 'CQRS', 'OAuth2/JWT', 'Code Review'],
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-light mb-6 text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold">À propos</span>
          </h1>

          <div className="bg-white/60 p-8 rounded-lg border border-stone-200">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-lg text-stone-600 mb-4 leading-relaxed">
                  Je suis <strong className="text-stone-800">Océan Barras</strong>, développeur
                  Web & Cloud Senior basé à <strong className="text-stone-800">Québec, QC</strong>.
                </p>
                <p className="text-stone-600 mb-4 leading-relaxed">
                  Avec plus de <strong className="text-stone-800">5 ans d'expérience</strong> dans
                  le développement d'applications d'entreprise, je me spécialise en{' '}
                  <strong className="text-stone-800">.NET, Azure</strong> et{' '}
                  <strong className="text-stone-800">intégration de données</strong>.
                </p>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  J'ai travaillé pour des organisations comme Industrielle Alliance et le
                  Ministère de la Santé, où j'ai développé des solutions critiques traitant
                  des milliers de transactions quotidiennes.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://linkedin.com/in/ocean-barras"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-dustyBlue-600 text-white hover:bg-dustyBlue-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border border-dustyBlue-600 text-dustyBlue-700 hover:bg-dustyBlue-50 transition-colors"
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
      <section className="py-16 px-6 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-light mb-8 text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold">Compétences techniques</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white/80 p-6 rounded-lg border border-stone-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-dustyBlue-500">
                    <FontAwesomeIcon icon={skill.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-stone-800 text-sm">{skill.category}</h3>
                </div>
                <ul className="space-y-1">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-stone-600">
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
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-light mb-8 text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faBriefcase} className="w-6 h-6" />
              Expérience professionnelle
            </span>
          </h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white/60 p-6 rounded-lg border border-stone-200 relative"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-semibold text-stone-800">{exp.company}</h3>
                    <p className="text-dustyBlue-600 text-sm">{exp.role}</p>
                  </div>
                  <span className="text-sm text-stone-500">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                      <span className="text-sage-500 mt-1">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-light mb-8 text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faGraduationCap} className="w-6 h-6" />
              Formation
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 p-6 rounded-lg border border-stone-200">
              <h3 className="font-semibold text-stone-800 mb-2">
                DEC en informatique de gestion
              </h3>
              <p className="text-dustyBlue-600 text-sm mb-1">Cégep Limoilou</p>
              <p className="text-stone-500 text-sm">2017 – 2020</p>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faTrophy} className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-stone-800">Bourse Gilles Joncas (2021)</h3>
              </div>
              <p className="text-stone-600 text-sm">
                Remise pour excellence académique et performance en stage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-light mb-8 text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold">Mes valeurs</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/60 p-6 rounded-lg border border-stone-200"
              >
                <h3 className="font-semibold text-stone-800 mb-2">{value.title}</h3>
                <p className="text-sm text-stone-600">{value.description}</p>
              </div>
            ))}
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
            Travaillons ensemble
          </h2>
          <p className="text-dustyBlue-100 mb-8 max-w-xl mx-auto">
            Vous avez un projet? Discutons de comment je peux vous aider.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-md text-base font-medium bg-white text-dustyBlue-700 hover:bg-dustyBlue-50 transition-colors"
          >
            Me contacter
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
