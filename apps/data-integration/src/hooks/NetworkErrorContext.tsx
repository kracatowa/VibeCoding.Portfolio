'use client';

// Ce hook fournit un contexte global pour détecter et afficher
// les erreurs réseau dans l'application côté client.
//
// But:
// - Écoute un événement global `network-error` (dispatched depuis `apiFetch`)
// - Stocke le dernier message d'erreur réseau et l'expose via `useNetworkError()`
// - Permet de nettoyer l'erreur (`clear()`), ou de la remplacer via `setError`
//
// Usage:
// - Envelopper l'application avec `<NetworkErrorProvider>` (déjà fait dans ClientLayoutWrapper)
// - Utiliser `useNetworkError()` dans un composant (par ex. `NetworkBanner`) pour afficher la bannière
//
// Raison pratique:
// - Centralise la logique d'affichage d'erreurs réseau (offline, CORS, timeouts, etc.)
// - Permet d'éviter de dupliquer des bannières/handlers dans chaque composant
// - Les événements sont émis par `apiFetch` pour garantir une capture uniforme
//
// Note:
// - Ce contexte est strictement client-side (ne fonctionne pas en SSR)
// - Les détails techniques des erreurs ne sont pas exposés en production par sécurité
//
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

type NetworkError = {
  message: string;
  time: string;
};

interface NetworkErrorContextValue {
  error: NetworkError | null;
  setError: (err: NetworkError | null) => void;
  clear: () => void;
}

const NetworkErrorContext = createContext<NetworkErrorContextValue | undefined>(undefined);

export function NetworkErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<NetworkError | null>(null);

  const handleWindowError = useCallback((e: Event) => {
    const custom = e as CustomEvent;
    if (!custom.detail) return;
    const payload = custom.detail as { message?: string };
    setError({ message: payload.message || 'Network error', time: new Date().toISOString() });
  }, []);

  useEffect(() => {
    window.addEventListener('network-error', handleWindowError as EventListener);
    return () => window.removeEventListener('network-error', handleWindowError as EventListener);
  }, [handleWindowError]);

  const clear = useCallback(() => setError(null), []);

  return (
    <NetworkErrorContext.Provider value={{ error, setError, clear }}>
      {children}
    </NetworkErrorContext.Provider>
  );
}

export function useNetworkError() {
  const ctx = useContext(NetworkErrorContext);
  if (!ctx) throw new Error('useNetworkError must be used within NetworkErrorProvider');
  return ctx;
}

export default NetworkErrorContext;
