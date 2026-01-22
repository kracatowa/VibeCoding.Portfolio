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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl p-8 border-2 border-terracotta-200 shadow-vintage-lg">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-terracotta-50 flex items-center justify-center">
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                className="text-terracotta-600 text-4xl"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2 text-charcoal-900">
            Quelque chose s'est mal passé
          </h1>
          
          {/* Description */}
          <p className="text-stone-600 text-center mb-6">
            Une erreur inattendue s'est produite. Veuillez réessayer ou contacter le support si le problème persiste.
          </p>

          {/* Error Details (Development Only) */}
          {isDevelopment && (
            <div className="bg-stone-50 rounded-lg p-4 mb-6 border border-stone-200">
              <h3 className="text-sm font-semibold text-terracotta-600 mb-2">
                Détails de l'erreur (environnement de développement):
              </h3>
              <p className="text-sm text-charcoal-800 font-mono mb-2">
                {error.message}
              </p>
              {error.stack && (
                <details className="mt-3">
                  <summary className="text-xs text-stone-600 cursor-pointer hover:text-charcoal-800">
                    Trace de la pile
                  </summary>
                  <pre className="mt-2 text-xs text-stone-700 overflow-x-auto whitespace-pre-wrap">
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
                className="px-6 py-3 bg-dustyBlue-500 hover:bg-dustyBlue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faRedo} />
                Réessayer
              </button>
            )}
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-white hover:bg-stone-50 text-charcoal-900 border-2 border-stone-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faHome} />
              Retour à l'accueil
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-sm text-stone-600">
              Si le problème persiste, veuillez contacter{' '}
              <a href="mailto:ocean.barras@hotmail.com" className="text-dustyBlue-600 hover:text-dustyBlue-700">
                ocean.barras@hotmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
