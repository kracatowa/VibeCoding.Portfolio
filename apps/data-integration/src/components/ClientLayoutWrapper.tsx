'use client';

import { DemoLayout, type LinkItem } from '@portfolio/shared-ui';
import NotificationBell from './NotificationBell';
import { NotificationProvider, useNotificationContext } from '@/hooks/NotificationContext';

/**
 * Wrapper client pour le layout de l'application.
 * 
 * Nécessaire car layout.tsx est un Server Component (pas de hooks React).
 * Ce wrapper permet d'utiliser le Context API pour partager l'état des notifications
 * entre la cloche (dans le header) et la page (pour déclencher les notifications).
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
export default function ClientLayoutWrapper({ children, headerLinks, footerLinks }: Props) {
  return (
    <NotificationProvider>
      <LayoutContent headerLinks={headerLinks} footerLinks={footerLinks}>
        {children}
      </LayoutContent>
    </NotificationProvider>
  );
}
