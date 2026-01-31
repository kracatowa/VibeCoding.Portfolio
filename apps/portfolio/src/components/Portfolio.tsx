const DATA_INTEGRATION_URL = process.env.NEXT_PUBLIC_DATA_INTEGRATION_URL || 'https://ocean-barras-data-integration.vercel.app';

const projects = [
  {
    title: 'Data Integration Hub',
    description:
      'Plateforme d\'intégration de données en temps réel avec extraction depuis Salesforce, HubSpot et Zendesk. Interface de monitoring avec étapes visuelles et planification automatique.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
    status: 'Démo interactive',
    features: [
      'Extraction de données multi-sources',
      'Nettoyage et normalisation automatique',
      'Export CSV avec suivi en temps réel',
      'Planification automatique par jour/heure',
    ],
    liveDemo: DATA_INTEGRATION_URL,
    isLive: true,
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="pt-24 sm:pt-20 lg:pt-12 px-6">
      <div className="mx-auto w-full max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="text-dustyBlue-600 font-semibold">Projets</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white/40 p-6 rounded-md flex flex-col h-full border-2 border-stone-400/60">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-stone-800">{project.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${project.isLive
                  ? 'bg-sage-100/60 text-sage-700'
                  : 'bg-lavender-100/60 text-lavender-700'
                  }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-stone-600 mb-4 grow leading-relaxed text-sm">{project.description}</p>

              <div className="mb-4">
                <h4 className="text-xs font-medium text-stone-600 mb-2">
                  Fonctionnalités clés:
                </h4>
                <ul className="text-xs text-stone-600 space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-terracotta-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-white/60 px-2 py-1 rounded-md text-xs text-stone-700">
                    {tech}
                  </span>
                ))}
              </div>

              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-auto items-center justify-center px-5 py-3 rounded-md text-sm font-semibold bg-dustyBlue-600 text-white hover:bg-dustyBlue-700 transform transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                >
                  Voir la démo interactive →
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/40 p-8 rounded-md text-center border-2 border-stone-400/60">
          <h3 className="text-xl font-light mb-3 text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
            Avez-vous un projet?
          </h3>
          <p className="text-stone-600 mb-6 max-w-xl mx-auto text-sm">
            Discutons-en
          </p>
          <a href="#contact" className="inline-flex border items-center px-4 py-2 rounded-md text-sm font-medium bg-white/40 text-dustyBlue-700 hover:bg-white/60 transform transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
            Me contacter
          </a>
        </div>
      </div>
    </section>
  );
}
