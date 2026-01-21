'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faCloud, faChartLine, faTicket, faSpinner, faRocket } from '@fortawesome/free-solid-svg-icons';
import { useAsyncData } from '@/hooks/asyncResolver';
import { apiFetch } from '@/lib/api/client';
import { Template } from '@/app/api/templates/templates.dto';
import { Destination } from '@/app/api/destinations/destinations.dto';
import Alert from './Errors/Alert';
import { CardSkeleton } from './Skeleton';

const sourceStyles : { id: string; icon: any; colorClass: string }[] = [
  { id: '1', icon: faCloud, colorClass: 'text-blue-400' },
  { id: '2', icon: faChartLine, colorClass: 'text-orange-400' },
  { id: '3', icon: faTicket, colorClass: 'text-green-400' },
];

const intervals = ["1 jour", "7 jours", "30 jours", "180 jours", "365 jours", "Toute la période"];

interface Props {
  onTrigger: (source: string, destination: string, template: string, interval: string) => void;
  isRunning: boolean;
}

export default function ManualTrigger({ onTrigger, isRunning }: Props) {
  const [selectedSourceId, setSelectedSource] = useState<string>('1');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>('1');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>('1');
  const [selectedInterval, setSelectedInterval] = useState<string>("1 jour");

  // SOURCES
  const { data: sources, error: sourcesError, refetch: refetchSources } = useAsyncData({
    fetcher: () => apiFetch('/api/sources') as Promise<Template[]>,
    dependencies: [],
  });

  // TEMPLATES
  const { data: templates, loading: loadingTemplates, error: templatesError, refetch: refetchTemplates } = useAsyncData({
    fetcher: () => apiFetch(`/api/templates?source=${selectedSourceId}`) as Promise<Template[]>,
    dependencies: [selectedSourceId],
  });

  // DESTINATIONS
  const { data: destinations, loading: loadingDestinations, error: destinationsError, refetch: refetchDestinations } = useAsyncData({
    fetcher: () => apiFetch(`/api/destinations`) as Promise<Destination[]>,
    dependencies: [],
  });

  useEffect(() => {
    setSelectedTemplateId(templates?.[0]?.id ?? null);
  }, [templates]);

  useEffect(() => {
    setSelectedDestinationId(destinations?.[0]?.id ?? null);
  }, [destinations]);

  const handleTrigger = () => {
    if (!isRunning && selectedSourceId && selectedDestinationId && selectedTemplateId && selectedInterval) {
      onTrigger(selectedSourceId, selectedDestinationId, selectedTemplateId, selectedInterval);
    }
  };

  return (
    <section id="manual-trigger" className="px-6 scroll-mt-20" >
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl"><FontAwesomeIcon icon={faBullseye} className="text-blue-400"/></span>
          Déclenchement manuel
        </h2>

        <div className="space-y-4">

          {/* Error alerts */}
          {sourcesError && (
            <Alert 
              message={`Erreur lors du chargement des sources: ${sourcesError.message}`}
              onRetry={refetchSources}
            />
          )}
          {templatesError && (
            <Alert 
              message={`Erreur lors du chargement des templates: ${templatesError.message}`}
              onRetry={refetchTemplates}
            />
          )}
          {destinationsError && (
            <Alert 
              message={`Erreur lors du chargement des destinations: ${destinationsError.message}`}
              onRetry={refetchDestinations}
            />
          )}

          {/* Sélection de la source */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Source de données
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {!sources ? (
                Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
              ) : (
                sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => setSelectedSource(source.id)}
                  disabled={isRunning}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedSourceId === source.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="text-3xl mb-2"><FontAwesomeIcon icon={sourceStyles.find(s => s.id === source.id)?.icon } className={sourceStyles.find(s => s.id === source.id)?.colorClass} /></div>
                  <div className="font-medium">{source.name}</div>
                </button>
              )))
              }
            </div>
          </div>

          {/* Sélection de l'intervalle */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              intervalle de temps
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {intervals.map((interval) => (
                <button
                  key={interval}
                  onClick={() => setSelectedInterval(interval)}
                  disabled={isRunning}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedInterval === interval
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="font-medium">{interval}</div>
                </button>
              ))}
            </div>
          </div>
            {/*TODO STACK ON ROW LARGE SCREEN*/}
            {/* Template selector */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Template CSV</label>
              <div className="grid grid-cols-1">
                <select
                  value={selectedTemplateId ?? ''}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  disabled={loadingTemplates || templates?.length === 0}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-gray-200"
                >
                  {loadingTemplates ? (
                    <option>Chargement...</option>
                  ) : templates?.length === 0 ? (
                    <option>Aucun template</option>
                  ) : (
                    templates?.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Destination selector */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Destination</label>
              <div className="grid grid-cols-1">
                <select
                  value={selectedDestinationId ?? ''}
                  onChange={(e) => setSelectedDestinationId(e.target.value)}
                  disabled={loadingDestinations || destinations?.length === 0}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-gray-200"
                >
                  {loadingDestinations ? (
                    <option>Chargement...</option>
                  ) : destinations?.length === 0 ? (
                    <option>Aucun destination</option>
                  ) : (
                    destinations?.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

          {/* Bouton de déclenchement */}
          <button
            onClick={handleTrigger}
            disabled={isRunning || !selectedSourceId}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
              isRunning
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isRunning ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="text-yellow-400" />
                Extraction en cours...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faRocket} className="text-white" />
                Déclencher l&apos;extraction
              </>
            )}
          </button>

          {/* Info */}
          <p className="text-gray-500 text-sm text-center">
            Lance une extraction immédiate depuis la source sélectionnée
          </p>
        </div>
      </div>
      </section>
  );
}
