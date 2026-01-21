'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNetworkError } from '@/hooks/NetworkErrorContext';

export default function NetworkBanner() {
  const { error, clear } = useNetworkError();

  if (!error) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-3xl w-full px-4">
      <div className="bg-terracotta-500 text-white rounded-lg p-3 border border-terracotta-600 shadow-vintage-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            <FontAwesomeIcon icon={faWifi} />
          </div>
          <div>
            <div className="font-semibold">Network issue detected</div>
            <div className="text-sm opacity-90">{error.message}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-terracotta-600 px-3 py-1 rounded-md font-medium hover:opacity-90"
            title="Recharger la page"
          >
            <FontAwesomeIcon icon={faRedo} className="mr-2" />
            Reload
          </button>
          <button
            onClick={clear}
            className="text-white px-2 py-1 rounded hover:bg-white/10"
            title="Hide"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    </div>
  );
}
