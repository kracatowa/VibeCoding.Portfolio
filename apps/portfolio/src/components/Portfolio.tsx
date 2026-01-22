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
    liveDemo: '/projects/data-integration',
    isLive: true,
  },
  /*{
    title: 'API de Gestion Financière',
    description:
      'API REST complète en .NET 8 pour la gestion de transactions financières. Inclut authentification JWT, validation, logging structuré et documentation Swagger.',
    technologies: ['.NET 8', 'SQL Server', 'Azure', 'REST API', 'JWT'],
    image: '💳',
    status: 'Idée de projet',
    features: [
      'CRUD complet avec Entity Framework Core',
      'Architecture Clean Architecture / DDD',
      'Tests unitaires avec xUnit',
      'Pipeline CI/CD Azure DevOps',
    ],
  },
  {
    title: 'Dashboard Analytics React',
    description:
      'Application React moderne avec visualisation de données en temps réel. Graphiques interactifs, filtres avancés et export de rapports.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
    image: '📊',
    status: 'Idée de projet',
    features: [
      'Composants réutilisables',
      'State management avec Redux Toolkit',
      'Responsive design',
      'Mode sombre/clair',
    ],
  },
  {
    title: 'Microservices E-Commerce',
    description:
      'Architecture microservices pour une plateforme e-commerce. Communication via message broker, API Gateway et orchestration Kubernetes.',
    technologies: ['.NET', 'Docker', 'Kubernetes', 'RabbitMQ', 'Azure'],
    image: '🛒',
    status: 'Idée de projet',
    features: [
      'Services indépendants et scalables',
      'Event sourcing et CQRS',
      'Monitoring avec Application Insights',
      'Déploiement blue-green',
    ],
  },
  {
    title: 'Automatisation DevOps',
    description:
      'Suite d\'outils d\'automatisation pour pipelines CI/CD. Analyse de code, gestion des secrets et déploiement automatisé.',
    technologies: ['Azure DevOps', 'PowerShell', 'Docker', 'SonarQube'],
    image: '🔧',
    status: 'Idée de projet',
    features: [
      'Templates YAML réutilisables',
      'Intégration SonarQube et Snyk',
      'Gestion des environnements',
      'Rollback automatique',
    ],
  },
  {
    title: 'Application Mobile Hybride',
    description:
      'Application mobile cross-platform avec .NET MAUI. Interface native, synchronisation offline et notifications push.',
    technologies: ['.NET MAUI', 'C#', 'SQLite', 'Azure Notification Hubs'],
    image: '📱',
    status: 'Idée de projet',
    features: [
      'UI native iOS et Android',
      'Authentification biométrique',
      'Cache local avec SQLite',
      'Sync en arrière-plan',
    ],
  },
  {
    title: 'Portail Client Self-Service',
    description:
      'Plateforme web permettant aux clients de gérer leurs services de façon autonome. Formulaires dynamiques et workflow d\'approbation.',
    technologies: ['ASP.NET Core', 'Blazor', 'SQL Server', 'Azure AD'],
    image: '🌐',
    status: 'Idée de projet',
    features: [
      'Authentification SSO',
      'Formulaires configurables',
      'Workflow d\'approbation',
      'Audit trail complet',
    ],
  },*/
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light mb-4" style={{fontFamily: 'Georgia, serif'}}>
            <span className="text-dustyBlue-600 font-semibold">Projets</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white/40 backdrop-blur-sm p-6 rounded-md flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-stone-800">{project.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  project.isLive 
                    ? 'bg-sage-100/60 text-sage-700' 
                    : 'bg-lavender-100/60 text-lavender-700'
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-stone-600 mb-4 grow leading-relaxed text-sm">{project.description}</p>

              <div className="mb-4">
                <h4 className="text-xs font-medium text-stone-600 mb-2">
                  Features
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

              <div className="flex flex-wrap gap-2 pt-3 border-t border-stone-200/50">
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

        <div className="mt-16 bg-white/40 backdrop-blur-sm p-8 rounded-md text-center">
          <h3 className="text-xl font-light mb-3 text-stone-800" style={{fontFamily: 'Georgia, serif'}}>
            Have a project?
          </h3>
          <p className="text-stone-600 mb-6 max-w-xl mx-auto text-sm">
            Let's discuss
          </p>
          <a href="#contact" className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-white/40 text-dustyBlue-700 hover:bg-white/60 transform transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
