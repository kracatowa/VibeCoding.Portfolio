const experiences = [
  {
    company: 'Industrielle Alliance',
    role: 'Développeur Full-stack (.NET / Azure / React)',
    period: 'Février 2023 – Juin 2025',
    achievements: [
      'Conçu un formulaire libre-service en ASP.NET remplaçant le processus papier de trésorerie, permettant aux 30 filiales d\'extraire leurs formulaires de façon autonome.',
      'Développé un outil Python d\'analyse des flux de trésorerie, accélérant l\'intégration de 6 filiales majeures dans le SaaS financier.',
      'Intégré Snyk et SonarQube dans le pipeline CI/CD (150 vulnérabilités corrigées).',
      'Développé des services backend (.NET) d\'automatisation et de simulation bancaire, générant plus de 70 000 $ d\'économies mensuelles cumulées.',
      'Participé aux révisions d\'architecture et accompagné l\'intégration des nouveaux développeurs.',
    ],
    technologies: ['.NET', 'Azure', 'React', 'Python', 'CI/CD', 'SonarQube'],
  },
  {
    company: 'Ségic',
    role: 'Développeur Back-end (.NET / Azure)',
    period: 'Juillet 2022 – Décembre 2022',
    achievements: [
      'Modernisé un système de calcul de primes d\'assurance en migrant vers Azure.',
      'Développé une API RESTful intégrée avec Kafka.',
      'Facilité la transition vers une architecture cloud hybride.',
    ],
    technologies: ['.NET', 'Azure', 'Kafka', 'REST API'],
  },
  {
    company: 'Industrielle Alliance',
    role: 'Développeur Back-end et stagiaire (.NET / Azure)',
    period: 'Janvier 2020 – Avril 2022',
    achievements: [
      'Refondu le système de paiements bancaires (5 000 transactions/jour).',
      'Développé une API REST pour connecter les données bancaires à un logiciel externe.',
      'Intégré des processus legacy (2 000 chèques/jour) sans migration complète.',
    ],
    technologies: ['.NET', 'Azure', 'SQL Server', 'REST API'],
  },
  {
    company: 'Ministère de la Santé',
    role: 'Développeur Full-stack stagiaire (Java, JavaScript)',
    period: 'Mai 2019 – Janvier 2020',
    achievements: [
      'Développé des fonctionnalités en Java dans un formulaire complexe de prise de décision pour les travailleurs sociaux.',
      'Maintenance d\'une application jQuery avec une immense base de données SQL.',
    ],
    technologies: ['Java', 'JavaScript', 'jQuery', 'SQL'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Mon <span className="gradient-text">Parcours</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Plus de 5 ans d&apos;expérience dans le développement logiciel, 
            principalement dans le secteur financier et gouvernemental
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item pb-8">
              <div className="card p-6 ml-4">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-sky-500">
                      {exp.company}
                    </h3>
                    <p className="text-gray-300 font-medium">{exp.role}</p>
                  </div>
                  <span className="text-gray-500 text-sm bg-gray-800 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-400 flex items-start gap-2">
                      <span className="text-sky-500 mt-1.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 card p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Formation</h3>
          <p className="text-gray-300">
            DEC en informatique de gestion - Cégep Limoilou (2017-2020)
          </p>
          <p className="text-violet-500 mt-2">
            🏆 Bourse Gilles Joncas (2021) — Excellence académique et performance en stage
          </p>
        </div>
      </div>
    </section>
  );
}
