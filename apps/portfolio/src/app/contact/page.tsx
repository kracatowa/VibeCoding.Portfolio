import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { createMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = createMetadata(
  'contact',
  'Contact - Discutons de votre projet',
  'Contactez Océan Barras pour discuter de votre projet de développement .NET, Azure ou intégration de données. Estimation gratuite.',
  ['contact', 'devis', 'estimation', 'consultation']
);

const contactInfo = [
  {
    icon: faEnvelope,
    label: 'Courriel',
    value: 'ocean.barras@hotmail.com',
    href: 'mailto:ocean.barras@hotmail.com',
  },
  {
    icon: faPhone,
    label: 'Téléphone',
    value: '418-520-5929',
    href: 'tel:418-520-5929',
  },
  {
    icon: faLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ocean-barras',
    href: 'https://linkedin.com/in/ocean-barras',
    external: true,
  },
  {
    icon: faMapMarkerAlt,
    label: 'Localisation',
    value: 'Québec, QC, Canada',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 py-12 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
            C O N T A C T
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-zinc-50 mb-6">
            Discutons de votre projet
          </h1>
          <div className="w-16 h-px bg-cyan-400 mx-auto mb-8"></div>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Vous avez un projet en tête? Discutons-en! Je vous répondrai dans les 24 heures.
          </p>
        </div>

        {/* Next section arrow */}
        <a
          href="#contact-cards"
          aria-label="Aller aux informations de contact"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-zinc-700 bg-dark-100/60 flex items-center justify-center text-zinc-300 hover:text-cyan-400 transition-transform hover:-translate-y-1 animate-bounce"
        >
          <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
        </a>
      </section>

      {/* Contact Cards */}
      <section id="contact-cards" className="pb-12 px-6 border-t border-zinc-800 pt-12 scroll-mt-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-dark-100 p-5 rounded border border-zinc-800 text-center hover:border-zinc-700 transition-all duration-300"
              >
                <span className="text-xs font-mono text-cyan-400/60 mb-3 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="text-zinc-600 group-hover:text-cyan-400 mb-3 flex justify-center transition-colors">
                  <FontAwesomeIcon icon={info.icon} className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-zinc-300 text-sm mb-1">{info.label}</h3>
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.external ? '_blank' : undefined}
                    rel={info.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors break-all"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-sm text-zinc-500">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="bg-dark-100 p-8 rounded border border-zinc-800">
            <div className="text-center mb-8">
              <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
                M E S S A G E
              </p>
              <h2 className="text-2xl font-light text-zinc-50 mb-2">
                Envoyer un message
              </h2>
              <p className="text-zinc-500 text-sm">
                Décrivez votre projet et je vous contacterai pour en discuter.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="bg-dark-100 border border-emerald-500/30 p-6 rounded text-center">
            <div className="text-emerald-400/70 mb-3 flex justify-center">
              <FontAwesomeIcon icon={faClock} className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-zinc-200 mb-2">Temps de réponse</h3>
            <p className="text-zinc-500 text-sm">
              Je m'engage à répondre à toutes les demandes dans un délai de{' '}
              <span className="text-emerald-400">24 heures</span> ouvrables. Pour les urgences, n'hésitez pas à
              m'appeler directement.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-[0.3em] mb-4">
              F A Q
            </p>
            <h2 className="text-2xl font-light text-zinc-50">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Comment fonctionne une première consultation?',
                a: 'La première consultation est gratuite et sans engagement. Nous discutons de votre projet, vos objectifs et vos contraintes. Je vous fais ensuite une proposition adaptée.',
              },
              {
                q: 'Quels sont vos tarifs?',
                a: 'Mes tarifs sont adaptés aux budgets des PME et startups. Je propose des prix fixes pour les projets bien définis, ou un taux horaire pour les missions flexibles. Contactez-moi pour une estimation gratuite.',
              },
              {
                q: 'Travaillez-vous à distance?',
                a: 'Oui, je travaille principalement à distance, ce qui me permet de collaborer avec des clients partout au Québec et au Canada. Des rencontres en personne sont possibles dans la région de Québec.',
              },
              {
                q: 'Quels types de projets acceptez-vous?',
                a: 'Je me spécialise dans le développement .NET/Azure, l\'intégration de données et l\'automatisation. Je privilégie les projets de petite à moyenne envergure où je peux avoir un impact significatif.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-dark-100 p-6 rounded border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-cyan-400/60 mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-medium text-zinc-200 mb-2">{faq.q}</h3>
                    <p className="text-sm text-zinc-500">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
