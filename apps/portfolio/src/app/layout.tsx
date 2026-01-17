import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { DemoLayout } from '@portfolio/shared-ui'

config.autoAddCss = false

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Océan Barras | Développeur Full-Stack .NET",
  description: "Portfolio d'Océan Barras, développeur Full-Stack spécialisé en .NET, Azure et React. Plus de 5 ans d'expérience dans le développement d'applications d'entreprise robustes et évolutives.",
  keywords: ["développeur", ".NET", "Azure", "React", "C#", "full-stack", "Québec", "portfolio"],
  authors: [{ name: "Océan Barras" }],
  openGraph: {
    title: "Océan Barras | Développeur Full-Stack .NET",
    description: "Développeur Full-Stack spécialisé en .NET, Azure et React",
    type: "website",
    locale: "fr_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DemoLayout
          headerLinks={[
            { href: '#accueil', label: 'Accueil' },
            { href: '#competences', label: 'Compétences' },
            { href: '#qualite', label: 'Qualité' },
            { href: '#experience', label: 'Expérience' },
            { href: '#portfolio', label: 'Portfolio' },
            { href: '#contact', label: 'Contact' },
          ]}
          footerLinks={[{ href: '/privacy', label: 'Privacy' }, { href: '/sitemap', label: 'Sitemap' }]}
        >
          {children}
        </DemoLayout>
      </body>
    </html>
  );
}
