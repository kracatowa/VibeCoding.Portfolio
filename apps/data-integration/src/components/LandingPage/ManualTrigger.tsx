'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faCloud, faChartLine, faTicket, faSpinner, faRocket, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { useAsyncData } from '@/hooks/asyncResolver';
import { apiFetch } from '@/lib/api/client';
import { Template } from '@/app/api/templates/templates.dto';
import { Destination } from '@/app/api/destinations/destinations.dto';
import Alert from '../Errors/Alert';
import { CardSkeleton } from '../Utilities/Skeleton';
import { Source } from '@/app/api/sources/sources.dto';

const sourceStyles: { id: string; icon: any; colorClass: string }[] = [
  { id: '1', icon: faCloud, colorClass: 'text-blue-400' },
  { id: '2', icon: faChartLine, colorClass: 'text-orange-400' },
  { id: '3', icon: faTicket, colorClass: 'text-green-400' },
];

const defaultSourceStyle = { icon: faDatabase, colorClass: 'text-gray-400' };

const intervals = ["1 jour", "7 jours", "30 jours", "180 jours", "365 jours", "Toute la période"];

interface Props {
  onTrigger: (source: string, destination: string, template: string, interval: string) => void;
  isRunning: boolean;
}

export default function ManualTrigger({ onTrigger, isRunning }: Props) {
  const [selectedSourceId, setSelectedSourceId] = useState<string>('1');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>('1');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>('1');
  const [selectedInterval, setSelectedInterval] = useState<string>("1 jour");

  // SOURCES
  const { data: sources, error: sourcesError, refetch: refetchSources } = useAsyncData({
    fetcher: () => apiFetch('/api/sources') as Promise<Source[]>,
    dependencies: [],
  });

  useEffect(() => {
    if (!sources) return;
    setSelectedSourceId(sources?.[0]?.id ?? '');
  }, [sources]);

  // TEMPLATES
  const { data: templates, loading: loadingTemplates, error: templatesError, refetch: refetchTemplates } = useAsyncData({
    fetcher: () => apiFetch(`/api/templates?source=${selectedSourceId}`) as Promise<Template[]>,
    dependencies: [selectedSourceId],
  });

  useEffect(() => {
    if (!templates) return;
    setSelectedTemplateId(templates?.[0]?.id ?? '');
  }, [templates]);

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

  // Refetch sources when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetchSources();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refetchSources]);

  const handleTrigger = () => {
    if (!isRunning && selectedSourceId && selectedDestinationId && selectedTemplateId && selectedInterval) {
      onTrigger(selectedSourceId, selectedDestinationId, selectedTemplateId, selectedInterval);
    }
  };

  return (
    <section id="manual-trigger" className="px-6 scroll-mt-20" >
      <div className="bg-white rounded-xl p-8 border-2 border-stone-200 shadow-vintage">
        <h2 className="text-2xl font-light mb-8 flex items-center gap-3 text-charcoal-800" style={{ fontFamily: 'Georgia, serif' }}>
          <span className="text-2xl"><FontAwesomeIcon icon={faBullseye} className="text-terracotta-500" /></span>
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
            <label className="block text-sm font-medium text-stone-700 mb-4">
              Source de données
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {!sources ? (
                Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
              ) : (
                sources.map((source) => {
                  const style = sourceStyles.find(s => s.id === source.id) || defaultSourceStyle;
                  return (
                    <button
                      key={source.id}
                      onClick={() => setSelectedSourceId(source.id)}
                      disabled={isRunning}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedSourceId === source.id
                        ? 'border-terracotta-400 bg-terracotta-50 shadow-vintage'
                        : 'border-stone-200 bg-white hover:border-terracotta-300 hover:shadow-vintage'
                        } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="text-3xl mb-2"><FontAwesomeIcon icon={style.icon} className={style.colorClass} /></div>
                      <div className="font-medium">{source.name}</div>
                    </button>
                  )
                }))}
            </div>
          </div>

          {/* Sélection de l'intervalle */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-4">
              Intervalle de temps
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {intervals.map((interval) => (
                <button
                  key={interval}
                  onClick={() => setSelectedInterval(interval)}
                  disabled={isRunning}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedInterval === interval
                    ? 'border-dustyBlue-400 bg-dustyBlue-50 shadow-vintage'
                    : 'border-stone-200 bg-white hover:border-dustyBlue-300 hover:shadow-vintage'
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
            <label className="block text-sm font-medium text-stone-700 mb-3">Modèle CSV</label>
            <div className="grid grid-cols-1">
              <select
                value={selectedTemplateId ?? ''}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                disabled={loadingTemplates || templates?.length === 0}
                className="bg-white border border-stone-300 rounded-xl p-3 text-charcoal-800 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all"
              >
                {loadingTemplates ? (
                  <option>Chargement...</option>
                ) : templates?.length === 0 ? (
                  <option>Aucun modèle</option>
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
            <label className="block text-sm font-medium text-stone-700 mb-3">Destination</label>
            <div className="grid grid-cols-1">
              <select
                value={selectedDestinationId ?? ''}
                onChange={(e) => setSelectedDestinationId(e.target.value)}
                disabled={loadingDestinations || destinations?.length === 0}
                className="bg-white border border-stone-300 rounded-xl p-3 text-charcoal-800 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all"
              >
                {loadingDestinations ? (
                  <option>Chargement...</option>
                ) : destinations?.length === 0 ? (
                  <option>Aucune destination</option>
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
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${isRunning
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : 'bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-vintage hover:shadow-vintage-lg'
              }`}
          >
            {isRunning ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="text-amber-500" />
                Extraction en cours...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faRocket} className="text-white" />
                Démarrer l'extraction
              </>
            )}
          </button>

          {/* Info */}
          <p className="text-stone-600 text-sm text-center">
            Lancer une extraction immédiate depuis la source sélectionnée
          </p>
        </div>
      </div>
    </section>
  );
}
