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
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-title">
            <span className="text-dustyBlue-600 font-semibold">Projects</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="card p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">{project.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  project.isLive 
                    ? 'bg-sage-100 text-sage-700 border border-sage-300' 
                    : 'bg-lavender-100 text-lavender-700 border border-lavender-300'
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-stone-600 mb-6 grow leading-relaxed">{project.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-stone-700 mb-3">
                  Features
                </h4>
                <ul className="text-sm text-stone-500 space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-terracotta-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-200">
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
                  Voir la démo interactive
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 card p-10 text-center">
          <h3 className="text-2xl font-light mb-4">
            Have a project?
          </h3>
          <p className="text-stone-600 mb-8 max-w-xl mx-auto">
            Let's discuss
          </p>
          <a href="#contact" className="btn-primary inline-block">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
