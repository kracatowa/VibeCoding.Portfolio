import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
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
    color: 'text-terracotta-500',
  },
  {
    icon: faPhone,
    label: 'Téléphone',
    value: '418-520-5929',
    href: 'tel:418-520-5929',
    color: 'text-dustyBlue-500',
  },
  {
    icon: faLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ocean-barras',
    href: 'https://linkedin.com/in/ocean-barras',
    color: 'text-sage-500',
    external: true,
  },
  {
    icon: faMapMarkerAlt,
    label: 'Localisation',
    value: 'Québec, QC, Canada',
    color: 'text-lavender-500',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold">Contact</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Vous avez un projet en tête? Discutons-en! Je vous répondrai dans les 24 heures.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/60 p-5 rounded-lg border border-stone-200 text-center hover:shadow-md transition-shadow"
              >
                <div className={`${info.color} mb-3 flex justify-center`}>
                  <FontAwesomeIcon icon={info.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-stone-800 text-sm mb-1">{info.label}</h3>
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.external ? '_blank' : undefined}
                    rel={info.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-dustyBlue-600 hover:text-dustyBlue-700 wrap-break-word"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-sm text-stone-600">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-6 bg-white/40">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 p-8 rounded-lg border border-stone-200">
            <h2
              className="text-2xl font-light mb-2 text-center"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <span className="text-dustyBlue-600 font-semibold">Envoyer un message</span>
            </h2>
            <p className="text-stone-500 text-center mb-8 text-sm">
              Décrivez votre projet et je vous contacterai pour en discuter.
            </p>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-sage-50 border border-sage-200 p-6 rounded-lg text-center">
            <div className="text-sage-600 mb-3 flex justify-center">
              <FontAwesomeIcon icon={faClock} className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-stone-800 mb-2">Temps de réponse</h3>
            <p className="text-stone-600 text-sm">
              Je m'engage à répondre à toutes les demandes dans un délai de{' '}
              <strong>24 heures</strong> ouvrables. Pour les urgences, n'hésitez pas à
              m'appeler directement.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6 bg-white/40">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-light mb-8 text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="text-dustyBlue-600 font-semibold">Questions fréquentes</span>
          </h2>

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
                className="bg-white/80 p-6 rounded-lg border border-stone-200"
              >
                <h3 className="font-semibold text-stone-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-stone-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
