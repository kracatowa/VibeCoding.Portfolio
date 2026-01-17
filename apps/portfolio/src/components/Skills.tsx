const skills = {
  'Langages & Frameworks': [
    { name: '.NET 9 / C#', level: 95 },
    { name: 'React / JavaScript', level: 85 },
    { name: 'SQL Server', level: 90 },
    { name: 'Python', level: 70 },
    { name: 'ASP.NET Core', level: 90 },
  ],
  'Cloud & DevOps': [
    { name: 'Microsoft Azure', level: 85 },
    { name: 'Docker', level: 80 },
    { name: 'Azure DevOps', level: 85 },
    { name: 'CI/CD Pipelines', level: 85 },
    { name: 'Kubernetes', level: 60 },
  ],
  'Architecture & Pratiques': [
    { name: 'REST API', level: 95 },
    { name: 'Domain-Driven Design', level: 80 },
    { name: 'Principes SOLID', level: 90 },
    { name: 'Tests unitaires', level: 85 },
    { name: 'Code Review', level: 90 },
  ],
};

const tools = [
  'Git',
  'Visual Studio',
  'VS Code',
  'GitHub Copilot',
  'SonarQube',
  'Snyk',
  'Bash',
  'Kafka',
];

export default function Skills() {
  return (
    <section id="competences" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Mes <span className="gradient-text">Compétences</span>
          </h2>
          <p className="section-subtitle">
            Technologies et outils que je maîtrise pour créer des solutions
            performantes et maintenables
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="card p-6">
              <h3 className="text-xl font-semibold mb-6 text-[#0ea5e9]">
                {category}
              </h3>
              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#8b5cf6] rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card p-8">
          <h3 className="text-xl font-semibold mb-6 text-center text-[#0ea5e9]">
            Outils & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span key={tool} className="tech-badge">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
