'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faRedo, faHome } from '@fortawesome/free-solid-svg-icons';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-900/50 rounded-2xl p-8 border border-red-500/30">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                className="text-red-500 text-4xl"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2">
            Oops! Quelque chose s'est mal passé
          </h1>
          
          {/* Description */}
          <p className="text-gray-400 text-center mb-6">
            Une erreur inattendue s'est produite. Veuillez réessayer ou contacter le support si le problème persiste.
          </p>

          {/* Error Details (Development Only) */}
          {isDevelopment && (
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700">
              <h3 className="text-sm font-semibold text-red-400 mb-2">
                Détails de l'erreur (environnement de développement):
              </h3>
              <p className="text-sm text-gray-300 font-mono mb-2">
                {error.message}
              </p>
              {error.stack && (
                <details className="mt-3">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                    Stack trace
                  </summary>
                  <pre className="mt-2 text-xs text-gray-400 overflow-x-auto whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {resetErrorBoundary && (
              <button
                onClick={resetErrorBoundary}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faRedo} />
                Réessayer
              </button>
            )}
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faHome} />
              Retour à l'accueil
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              Si le problème persiste, veuillez contacter{' '}
              <a href="mailto:ocean.barras@hotmail.com" className="text-blue-400 hover:text-blue-300">
                ocean.barras@hotmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
