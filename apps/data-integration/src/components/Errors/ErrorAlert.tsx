'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'error' | 'warning';
}

/**
 * ErrorAlert - Composant pour afficher les erreurs de manière élégante
 * 
 * @param message - Message d'erreur à afficher
 * @param onRetry - Callback pour réessayer l'opération (optionnel)
 * @param onDismiss - Callback pour fermer l'alerte (optionnel)
 * @param variant - Type d'alerte: 'error' (rouge) ou 'warning' (orange)
 */
export default function ErrorAlert({ 
  message, 
  onRetry, 
  onDismiss, 
  variant = 'error' 
}: ErrorAlertProps) {
  const styles = variant === 'error' 
    ? {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: 'text-red-500',
        button: 'bg-red-600 hover:bg-red-700'
      }
    : {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        icon: 'text-orange-500',
        button: 'bg-orange-600 hover:bg-orange-700'
      };

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4 mb-4`}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <FontAwesomeIcon 
          icon={faExclamationCircle} 
          className={`${styles.icon} text-xl mt-0.5 shrink-0`}
        />
        
        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className={`${styles.text} text-sm`}>
            {message}
          </p>
        </div>

        {/* Actions */}
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
