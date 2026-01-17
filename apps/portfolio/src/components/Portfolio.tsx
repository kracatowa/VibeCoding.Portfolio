const projects = [
  {
    title: 'Data Integration Hub',
    description:
      'Plateforme d\'intégration de données en temps réel avec extraction depuis Salesforce, HubSpot et Zendesk. Interface de monitoring avec étapes visuelles et planification automatique.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
    image: '🔄',
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
  {
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
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-6 bg-[rgba(15,23,42,0.5)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Mes <span className="gradient-text">Projets</span>
          </h2>
          <p className="section-subtitle">
            Une sélection de projets démontrant mes compétences techniques et ma
            capacité à livrer des solutions complètes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="card p-6 flex flex-col h-full">
              <div className="text-5xl mb-4 text-center">{project.image}</div>
              
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.isLive 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-[#8b5cf6]/20 text-[#8b5cf6]'
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-gray-400 mb-4 grow">{project.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  Fonctionnalités clés :
                </h4>
                <ul className="text-sm text-gray-500 space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#0ea5e9]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-badge text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 btn-primary text-center flex items-center justify-center gap-2"
                >
                  <span>🚀</span>
                  Voir la démo interactive
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 card p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Vous avez un projet en tête ?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Ces projets représentent des idées que je peux développer pour enrichir
            mon portfolio. Si vous souhaitez collaborer sur un projet similaire ou
            avez des besoins spécifiques, n&apos;hésitez pas à me contacter !
          </p>
          <a href="#contact" className="btn-primary inline-block">
            Discutons de votre projet
          </a>
        </div>
      </div>
    </section>
  );
}
