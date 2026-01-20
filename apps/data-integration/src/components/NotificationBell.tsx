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
      return 'border-blue-500/30 bg-blue-500/10';
    case 'success':
      return 'border-green-500/30 bg-green-500/10';
    case 'error':
      return 'border-red-500/30 bg-red-500/10';
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
        className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ''}`}
      >
        <FontAwesomeIcon icon={faBell} className="text-gray-400 text-xl" />
        
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
            aria-live="polite"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panneau déroulant */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50 max-h-[600px] flex flex-col">
          {/* En-tête */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="font-semibold text-white">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  title="Tout marquer comme lu"
                >
                  <FontAwesomeIcon icon={faCheckDouble} />
                  Tout lire
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
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
              <div className="p-8 text-center text-gray-400">
                <span className="text-4xl">🔔</span>
                <p className="mt-2 text-sm">Aucune notification</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 transition-all duration-200 ${
                      !notification.read
                        ? 'bg-gray-800/50 hover:bg-gray-800/70'
                        : 'hover:bg-gray-800/30'
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
                        <p className={`text-sm ${!notification.read ? 'text-white font-medium' : 'text-gray-300'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
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
                          className="text-blue-400 hover:text-blue-300 transition-colors"
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
            <div className="p-3 border-t border-gray-700 text-center">
              <p className="text-xs text-gray-400">
                {notifications.length - 10} notification(s) plus ancienne(s)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
