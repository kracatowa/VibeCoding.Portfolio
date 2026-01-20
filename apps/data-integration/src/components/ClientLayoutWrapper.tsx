'use client';

import { DemoLayout, type LinkItem } from '@portfolio/shared-ui';
import NotificationBell from './NotificationBell';
import { NotificationProvider, useNotificationContext } from '@/hooks/NotificationContext';
import { NetworkErrorProvider } from '@/hooks/NetworkErrorContext';
import NetworkBanner from './Errors/NetworkBanner';
import ErrorBoundary from './Errors/ErrorBoundary';

/**
 * Wrapper client pour le layout de l'application.
 * 
 * Nécessaire car layout.tsx est un Server Component (pas de hooks React).
 * Ce wrapper permet d'utiliser le Context API pour partager l'état des notifications
 * entre la cloche (dans le header) et la page (pour déclencher les notifications).
 * 
 * Inclut également ErrorBoundary pour capturer et gérer les erreurs React.
 */

interface Props {
  children: React.ReactNode;
  headerLinks?: LinkItem[];
  footerLinks?: LinkItem[];
}

// Composant interne qui consomme le context des notifications
function LayoutContent({ children, headerLinks, footerLinks }: Props) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotificationContext();

  return (
    <DemoLayout
      headerLinks={headerLinks}
      footerLinks={footerLinks}
      headerRightContent={
        <NotificationBell
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClearAll={clearAll}
        />
      }
    >
      {children}
    </DemoLayout>
  );
}

// Fournit le context des notifications à toute l'application
// Enveloppe tout dans ErrorBoundary pour capturer les erreurs React
export default function ClientLayoutWrapper({ children, headerLinks, footerLinks }: Props) {
  return (
    <ErrorBoundary>
      <NetworkErrorProvider>
        <NotificationProvider>
          <NetworkBanner />
          <LayoutContent headerLinks={headerLinks} footerLinks={footerLinks}>
            {children}
          </LayoutContent>
        </NotificationProvider>
      </NetworkErrorProvider>
    </ErrorBoundary>
  );
}
