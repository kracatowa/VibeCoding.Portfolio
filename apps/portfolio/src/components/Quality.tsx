import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShield,
  faBolt,
  faSyncAlt,
  faClipboardCheck,
  faUsers,
  faClock,
} from '@fortawesome/free-solid-svg-icons'

const qualityPrinciples = [
  {
    icon: faShield,
    title: 'Code robuste et sécurisé',
    description:
      'Intégration systématique d\'outils comme SonarQube et Snyk dans les pipelines CI/CD. Plus de 150 vulnérabilités corrigées dans mes projets récents, garantissant des applications fiables et conformes aux standards de sécurité.',
  },
  {
    icon: faBolt,
    title: 'Livraison efficace',
    description:
      'Développement d\'automatisations générant plus de 70 000 $ d\'économies mensuelles. Conception de solutions qui remplacent des processus manuels et accélèrent l\'intégration de systèmes complexes.',
  },
  {
    icon: faSyncAlt,
    title: 'Code maintenable',
    description:
      'Application rigoureuse des principes SOLID et DDD. Architecture modulaire facilitant l\'évolution et la maintenance à long terme. Participation active aux révisions de code et à l\'accompagnement des équipes.',
  },
  {
    icon: faClipboardCheck,
    title: 'Tests et couverture',
    description:
      'Mise en place systématique de tests unitaires et d\'intégration. Utilisation de TDD lorsque pertinent pour garantir la fiabilité du code dès la conception.',
  },
  {
    icon: faUsers,
    title: 'Esprit d\'équipe',
    description:
      'Challenge constructif des choix techniques, mentorat des nouveaux développeurs et participation active aux révisions d\'architecture. Engagement envers l\'amélioration continue de l\'équipe.',
  },
  {
    icon: faClock,
    title: 'Respect des délais',
    description:
      'Capacité à estimer avec précision et à livrer dans les temps. Gestion proactive des risques et communication transparente sur l\'avancement des projets.',
  },
];

export default function Quality() {
  return (
    <section id="qualite" className="py-20 px-6 bg-[rgba(15,23,42,0.5)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text">Qualité</span> et Efficacité
          </h2>
          <p className="section-subtitle">
            Mon engagement : livrer du code de qualité professionnelle, 
            performant et maintenable, dans les délais impartis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qualityPrinciples.map((principle, index) => (
            <div
              key={index}
              className="card p-8 text-center hover:border-[#8b5cf6]"
            >
              <div className="text-[#0ea5e9] mb-6 flex justify-center">
                <FontAwesomeIcon icon={principle.icon} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{principle.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 card p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">70 000$+</div>
              <p className="text-gray-400">Économies mensuelles générées</p>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">150+</div>
              <p className="text-gray-400">Vulnérabilités corrigées</p>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">5000+</div>
              <p className="text-gray-400">Transactions/jour gérées</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
