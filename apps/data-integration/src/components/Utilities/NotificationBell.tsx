'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faCheckDouble, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { Notification, NotificationType } from '@/hooks/useNotifications';

interface Props {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'start':
      return '🚀';
    case 'success':
      return '✅';
    case 'error':
      return '❌';
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'start':
      return 'border-dustyBlue-300 bg-dustyBlue-50';
    case 'success':
      return 'border-sage-300 bg-sage-50';
    case 'error':
      return 'border-terracotta-300 bg-terracotta-50';
  }
};

const formatTimestamp = (timestamp: string): string => {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `il y a ${days}j`;
  if (hours > 0) return `il y a ${hours}h`;
  if (minutes > 0) return `il y a ${minutes}min`;
  return 'à l\'instant';
};

export default function NotificationBell({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ferme le panneau déroulant quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const recentNotifications = notifications.slice(0, 10);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton cloche */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ''}`}
      >
        <FontAwesomeIcon icon={faBell} className="text-stone-600 text-xl" />

        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
            aria-live="polite"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panneau déroulant */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-stone-200 rounded-xl shadow-vintage-xl z-50 max-h-[600px] flex flex-col">
          {/* En-tête */}
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <h3 className="font-semibold text-charcoal-900">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-xs text-dustyBlue-600 hover:text-dustyBlue-700 transition-colors flex items-center gap-1"
                  title="Tout marquer comme lu"
                >
                  <FontAwesomeIcon icon={faCheckDouble} />
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-stone-500 hover:text-terracotta-500 transition-colors flex items-center gap-1"
                  title="Tout effacer"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          </div>

          {/* Liste des notifications */}
          <div className="overflow-y-auto flex-1">
            {recentNotifications.length === 0 ? (
              <div className="p-8 text-center text-stone-500">
                <span className="text-4xl">🔔</span>
                <p className="mt-2 text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 transition-all duration-200 ${!notification.read
                        ? 'bg-stone-50 hover:bg-stone-100'
                        : 'hover:bg-stone-50'
                      } cursor-pointer`}
                    onClick={() => {
                      if (!notification.read) {
                        onMarkAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icône */}
                      <div className={`p-2 rounded-lg border ${getNotificationColor(notification.type)}`}>
                        <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notification.read ? 'text-charcoal-900 font-medium' : 'text-charcoal-600'
                          }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>

                      {/* Indicateur de lecture */}
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsRead(notification.id);
                          }}
                          className="text-dustyBlue-600 hover:text-dustyBlue-700 transition-colors"
                          title="Marquer comme lu"
                        >
                          <FontAwesomeIcon icon={faCheck} className="text-xs" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pied de page */}
          {notifications.length > 10 && (
            <div className="p-3 border-t border-stone-200 text-center">
              <p className="text-xs text-stone-500">
                {notifications.length - 10} older notification(s)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
