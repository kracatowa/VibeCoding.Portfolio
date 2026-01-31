import { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Développeur Web & Cloud Senior | Modernisation cloud, Automatisation, Intégration de données',
  description:
    'Océan Barras - Développeur Web & Cloud Senior à Québec. Spécialisé en modernisation cloud, Automatisation et intégration de données. Plus de 5 ans d\'expérience. Taux abordables pour PME et startups.',
  openGraph: {
    title: 'Océan Barras | Développeur Web & Cloud Senior',
    description:
      'Développeur Web & Cloud Senior à Québec. Spécialisé en modernisation cloud, Automatisation et intégration de données. Taux abordables pour PME et startups à Québec.',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
