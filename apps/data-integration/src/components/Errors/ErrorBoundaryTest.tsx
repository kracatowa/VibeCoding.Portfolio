'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

/**
 * Composant de test pour ErrorBoundary
 * 
 * Utilisation:
 * 1. Ajouter ce composant temporairement à page.tsx
 * 2. Cliquer sur "Provoquer une erreur React"
 * 3. Vérifier que ErrorFallback s'affiche correctement
 * 4. Retirer ce composant après les tests
 */
export default function ErrorBoundaryTest() {
  const [shouldThrow, setShouldThrow] = useState(false);

  // Cette erreur sera capturée par ErrorBoundary
  if (shouldThrow) {
    throw new Error('Test ErrorBoundary: This is a simulated React rendering error!');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
        title="Test ErrorBoundary - Provoque une erreur React volontaire"
      >
        <FontAwesomeIcon icon={faBug} />
        Test Error Boundary
      </button>
    </div>
  );
}
