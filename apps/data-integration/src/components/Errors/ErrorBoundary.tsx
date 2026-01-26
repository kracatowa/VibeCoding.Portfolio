'use client';

import React, { Component, ReactNode } from 'react';
import ErrorFallback from './ErrorFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary - Composant de limite d'erreur React
 * 
 * Capture les erreurs JavaScript dans n'importe quel composant enfant,
 * enregistre ces erreurs et affiche une interface de secours au lieu de
 * faire crasher toute l'application.
 * 
 * Utilisation:
 * <ErrorBoundary>
 *   <YourApp />
 * </ErrorBoundary>
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Met à jour l'état pour afficher l'UI de secours au prochain rendu
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log l'erreur à un service de reporting (ex: Sentry, LogRocket)
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Appeler le callback personnalisé si fourni
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // En production, vous pourriez envoyer l'erreur à un service externe:
    // logErrorToService(error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Utiliser le fallback personnalisé ou le composant ErrorFallback par défaut
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback 
          error={this.state.error} 
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}
