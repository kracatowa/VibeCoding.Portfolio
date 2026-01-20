'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { useNetworkError } from '@/hooks/NetworkErrorContext';

export default function NetworkBannerTest() {
  const [count, setCount] = useState(0);
  const { clear } = useNetworkError();

  const triggerNetworkError = () => {
    const message = `Erreur réseau simulée (test ${count + 1})`;
    try {
      window.dispatchEvent(new CustomEvent('network-error', { detail: { message } }));
    } catch (e) {
      // ignore in non-browser
    }
    setCount((c) => c + 1);
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
        <button
          onClick={triggerNetworkError}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg flex items-center gap-2"
          title="Simuler une erreur réseau"
        >
          <FontAwesomeIcon icon={faWifi} />
          Test NetworkBanner
        </button>

        <button
          onClick={clear}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-lg"
          title="Masquer la bannière réseau"
        >
          Clear
        </button>
      </div>
    </>
  );
}
