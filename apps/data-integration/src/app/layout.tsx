import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import ClientLayoutWrapper from '@/components/Utilities/ClientLayoutWrapper';

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
  title: "Data Integration Hub | Plateforme d'intégration de données",
  description: "Plateforme d'intégration de données permettant d'extraire, nettoyer et exporter des données depuis diverses sources (Salesforce, HubSpot, Zendesk).",
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
        <ClientLayoutWrapper
          headerLinks={[{ href: '/projects/data-integration', label: 'Tableau de bord' }]}
          footerLinks={[{ href: '/terms', label: 'Terms' },
          { href: '/help', label: 'Help' }]}
        >
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
