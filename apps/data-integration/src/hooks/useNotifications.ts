import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api/client';
import { Notification as NotificationDTO } from '@/app/api/notifications/notifications.dto';

export type NotificationType = 'start' | 'success' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  extractionId: string;
  sourceName: string;
  timestamp: string;
  read: boolean;
  message: string;
}

// Request browser notification permission
const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) return false;
  
  if (Notification.permission === 'granted') return true;
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
};

// Convert DTO to UI notification with message
const toNotification = (dto: NotificationDTO): Notification => {
  const message = 
    dto.type === 'start' ? `Extraction démarrée pour ${dto.sourceName}` :
    dto.type === 'success' ? `Extraction terminée pour ${dto.sourceName}` :
    `Extraction échouée pour ${dto.sourceName}`;

  return {
    ...dto,
    message,
  };
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasPermission, setHasPermission] = useState(false);

  // Load notifications from API on mount
  const loadNotifications = useCallback(async () => {
    try {
      const data = await apiFetch<NotificationDTO[]>('/api/notifications');
      setNotifications(data.map(toNotification));
    } catch (err) {
      console.error('Error loading notifications:', err);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
    
    // Request notification permission
    requestNotificationPermission().then(setHasPermission);
  }, [loadNotifications]);

  const addNotification = useCallback(async (
    type: NotificationType,
    extractionId: string,
    sourceName: string
  ) => {
    try {
      // Create notification via API
      const dto = await apiFetch<NotificationDTO>('/api/notifications', {
        method: 'POST',
        body: { type, extractionId, sourceName },
      });

      const notification = toNotification(dto);

      // Update local state
      setNotifications(prev => [notification, ...prev]);

      // Show browser notification for completed/failed extractions
      if (hasPermission && (type === 'success' || type === 'error')) {
        try {
          new Notification('Data Integration', {
            body: notification.message,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: extractionId,
          });
        } catch (err) {
          console.error('Error showing browser notification:', err);
        }
      }

      // Play sound for completed extractions
      if (type === 'success') {
        playNotificationSound();
      }
    } catch (err) {
      console.error('Error adding notification:', err);
    }
  }, [hasPermission]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await apiFetch('/api/notifications', {
        method: 'PATCH',
        body: JSON.stringify({ id }),
      });

      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await apiFetch('/api/notifications', {
        method: 'PATCH',
        body: { markAllAsRead: true },
      });

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      await apiFetch('/api/notifications', {
        method: 'DELETE',
      });

      setNotifications([]);
    } catch (err) {
      console.error('Error clearing notifications:', err);
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
  };
}

// Play a subtle notification sound
function playNotificationSound() {
  try {
    // Create a simple beep using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (err) {
    // Silently fail if audio is not supported
  }
}
