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
        bg: 'bg-sage-50',
        border: 'border-sage-300',
        text: 'text-sage-800',
        icon: 'text-sage-600',
        button: 'bg-sage-500 hover:bg-sage-600'
      }
    : variant === 'warning'
    ? {
        bg: 'bg-amber-50',
        border: 'border-amber-300',
        text: 'text-amber-800',
        icon: 'text-amber-600',
        button: 'bg-amber-500 hover:bg-amber-600'
      }
    : {
        bg: 'bg-terracotta-50',
        border: 'border-terracotta-300',
        text: 'text-terracotta-800',
        icon: 'text-terracotta-600',
        button: 'bg-terracotta-500 hover:bg-terracotta-600'
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
              Retry
            </button>
          )}

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-stone-500 hover:text-charcoal-700 transition-colors p-1"
              title="Close"
            >
              <FontAwesomeIcon icon={faTimes} className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
