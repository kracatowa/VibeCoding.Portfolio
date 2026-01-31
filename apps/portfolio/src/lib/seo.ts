import { Metadata } from 'next';

const siteConfig = {
  name: 'Océan Barras',
  title: 'Développeur Web & Cloud Senior',
  description:
    "Développeur Web & Cloud Senior en modernisation cloud, automatisation et intégration de données. J'utilise également des outils d'intelligence artificielle (IA) pour accélérer le développement, la documentation, les tests et les revues de code. Plus de 5 ans d'expérience dans le développement d'applications d'entreprise. Basé à Québec, QC.",
  url: 'https://ocean-barras.dev',
  locale: 'fr_CA',
  author: 'Océan Barras',
  email: 'ocean.barras@hotmail.com',
  phone: '418-520-5929',
  linkedin: 'https://linkedin.com/in/ocean-barras',
  location: 'Québec, QC, Canada',
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'développeur web',
    'développeur cloud',
    'développeur .NET',
    'Azure',
    'C#',
    'intégration de données',
    'API REST',
    'microservices',
    'freelance',
    'Québec',
    'consultant',
    'automatisation',
    'intelligence artificielle',
    'IA',
    'développement assisté par IA',
    'IA-assisté',
    'machine learning',
    'modèles de langage',
    'LLM',
    'ChatGPT',
    'GitHub Copilot',
    'revues de code assistées par IA',
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'fr-CA': siteConfig.url,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
};

// JSON-LD Structured Data for Person
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.author,
  jobTitle: siteConfig.title,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  url: siteConfig.url,
  sameAs: [siteConfig.linkedin],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Québec',
    addressRegion: 'QC',
    addressCountry: 'CA',
  },
  knowsAbout: [
    '.NET',
    'C#',
    'Azure',
    'Cloud Development',
    'API REST',
    'Microservices',
    'Data Integration',
    'TypeScript',
    'React',
    'Next.js',
    'Intelligence Artificielle',
    'Machine Learning',
    'ChatGPT',
    'GitHub Copilot',
    'Claude opus 4.5',
    'Développement assisté par IA',
  ],
};

// JSON-LD for Website
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    '@type': 'Person',
    name: siteConfig.author,
  },
};

// Helper to create page-specific metadata
export function createMetadata(
  page: string,
  title: string,
  description: string,
  additionalKeywords?: string[]
): Metadata {
  return {
    title,
    description,
    keywords: additionalKeywords
      ? [...(baseMetadata.keywords as string[]), ...additionalKeywords]
      : baseMetadata.keywords,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/${page}`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${page}`,
    },
  };
}

export default siteConfig;
