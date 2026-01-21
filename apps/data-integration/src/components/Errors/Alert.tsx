'use client';

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faRedo, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface AlertProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'error' | 'warning' | 'success';
  autoDismiss?: number | false;
}

export default function Alert({
  message,
  onRetry,
  onDismiss,
  variant = 'error',
  autoDismiss = false
}: AlertProps) {
  useEffect(() => {
    if (autoDismiss && onDismiss) {
      const t = setTimeout(() => onDismiss(), autoDismiss as number);
      return () => clearTimeout(t);
    }
  }, [autoDismiss, onDismiss]);

  const styles = variant === 'success'
    ? {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        icon: 'text-green-500',
        button: 'bg-green-600 hover:bg-green-700'
      }
    : variant === 'warning'
    ? {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        icon: 'text-orange-500',
        button: 'bg-orange-600 hover:bg-orange-700'
      }
    : {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: 'text-red-500',
        button: 'bg-red-600 hover:bg-red-700'
      };

  const icon = variant === 'success' ? faCheckCircle : faExclamationCircle;
  const role = variant === 'error' ? 'alert' : undefined;
  const ariaLive = variant === 'error' ? 'assertive' : 'polite';

  return (
    <div role={role} aria-live={ariaLive} className={`${styles.bg} ${styles.border} border rounded-lg p-4 mb-4`}>
      <div className="flex items-start gap-3">
        <FontAwesomeIcon
          icon={icon}
          className={`${styles.icon} text-xl mt-0.5 shrink-0`}
        />

        <div className="flex-1 min-w-0">
          <p className={`${styles.text} text-sm`}>{message}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onRetry && (
            <button
              onClick={onRetry}
              className={`${styles.button} text-white px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5`}
              title="Réessayer"
            >
              <FontAwesomeIcon icon={faRedo} className="text-xs" />
              Réessayer
            </button>
          )}

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-500 hover:text-gray-300 transition-colors p-1"
              title="Fermer"
            >
              <FontAwesomeIcon icon={faTimes} className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
