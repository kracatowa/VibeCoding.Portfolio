'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from './ErrorAlert';

export default function ErrorAlertTest() {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const handleRetry = () => {
    // Simulate retry logic: increment counter and hide alert
    setCount((c) => c + 1);
    setVisible(false);
    console.log('ErrorAlertTest: retry clicked');
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setVisible(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg flex items-center gap-2"
          title="Afficher l'alerte d'erreur de test"
        >
          <FontAwesomeIcon icon={faBug} />
          Test ErrorAlert
        </button>
      </div>

      {visible && (
        <div className="max-w-xl mx-auto mt-4">
          <ErrorAlert
            message={`Erreur simulée : opération échouée (tentative ${count + 1}).`}
            onRetry={handleRetry}
            onDismiss={() => setVisible(false)}
            variant="error"
          />
        </div>
      )}
    </>
  );
}
