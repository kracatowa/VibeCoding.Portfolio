'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSpinner, faCheckCircle, faSave, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useAsyncData } from '@/hooks/asyncResolver';
import { Template } from '@/app/api/templates/templates.dto';
import { Schedule, SchedulePreference } from '@/app/api/schedules/schedules.dto';
import { apiFetch } from '@/lib/api/client';
import Alert from '../Errors/Alert';
import { ScheduleGridSkeleton } from '../Utilities/Skeleton';
import { Source } from '@/app/api/sources/sources.dto';

const daysOfWeek = [
  { id: 1, name: 'Lundi', short: 'Lun' },
  { id: 2, name: 'Mardi', short: 'Mar' },
  { id: 3, name: 'Mercredi', short: 'Mer' },
  { id: 4, name: 'Jeudi', short: 'Jeu' },
  { id: 5, name: 'Vendredi', short: 'Ven' },
  { id: 6, name: 'Samedi', short: 'Sam' },
  { id: 0, name: 'Dimanche', short: 'Dim' },
];

// default schedules generator (keeps layout stable before API returns)
const getDefaultSchedules = (): SchedulePreference[] =>
  daysOfWeek.map((d) => ({
    dayOfWeek: d.id,
    enabled: false
  }));

export default function AutomaticScheduler() {
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [selectedSourceId, setSelectedSourceId] = useState<string>("1");
  const [selectedSchedulePreferences, setSelectedSchedulePreferences] = useState<SchedulePreference[]>(getDefaultSchedules());
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("1");
  const [isSaving, setIsSaving] = useState(false);

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
  const { data: templates, error: templatesError, refetch: refetchTemplates } = useAsyncData({
    fetcher: () => apiFetch(`/api/templates?source=${selectedSourceId}`) as Promise<Template[]>,
    dependencies: [selectedSourceId],
  });

  useEffect(() => {
    if (!templates) return;
    setSelectedTemplateId(templates?.[0]?.id ?? '');
  }, [templates]);

  // SCHEDULES
  const { data: schedules, error: schedulesError, refetch: refetchSchedules } = useAsyncData({
    fetcher: () => apiFetch('/api/schedules') as Promise<Schedule[]>,
    dependencies: [saveSuccess],
  });

  useEffect(() => {
    if (!schedules || !templates) return;

    setSelectedScheduleId(
      schedules?.find((s) => s.sourceId === selectedSourceId && s.templateId === selectedTemplateId)?.id || ''
    );
  }, [schedules, templates, selectedSourceId, selectedTemplateId]);

  useEffect(() => {
    if (!schedules) return;

    setSelectedSchedulePreferences(
      schedules?.find((s) => s.id === selectedScheduleId)?.schedulePreferences || getDefaultSchedules()
    );
  }, [selectedScheduleId, schedules]);

  // HANDLERS
  const handleToggleDay = (dayOfWeek: number) => {
    setSelectedSchedulePreferences((prev) =>
      prev.map((s) =>
        s.dayOfWeek === dayOfWeek
          ? { ...s, enabled: !s.enabled, time: s.enabled ? '' : s.time || '08:00' }
          : s
      )
    );
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const handleTimeChange = (dayOfWeek: number, time: string) => {
    setSelectedSchedulePreferences((prev) =>
      prev.map((s) => (s.dayOfWeek === dayOfWeek ? { ...s, time } : s))
    );
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      await apiFetch('/api/schedules', {
        method: 'PUT',
        body: {
          scheduleId: selectedScheduleId,
          updatedSchedulePreferences: selectedSchedulePreferences
        },
      });

      setHasChanges(false);
      setSaveSuccess(true);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const getScheduleForDay = (dayOfWeek: number): SchedulePreference | undefined => {
    return selectedSchedulePreferences.find((s) => s.dayOfWeek === dayOfWeek);
  };

  const enabledCount = selectedSchedulePreferences.filter((s) => s.enabled).length;

  return (
    <section id="automatic-scheduler" className='py-4 px-6 scroll-mt-20'>
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-vintage">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-charcoal-900">
          <span className="text-2xl text-sage-500"><FontAwesomeIcon icon={faClock} /></span>
          Planification automatique
        </h2>

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
        {schedulesError && (
          <Alert
            message={`Erreur lors du chargement des horaires: ${schedulesError.message}`}
            onRetry={refetchSchedules}
          />
        )}

        {/* Source & Template selector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Source selector */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">Source</label>
            <select
              value={selectedSourceId}
              onChange={(e) => setSelectedSourceId(e.target.value)}
              className="bg-white border border-stone-300 rounded-xl p-3 text-charcoal-800 w-full focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all"
            >
              {sources?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Template selector */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">Modèle</label>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="bg-white border border-stone-300 rounded-xl p-3 text-charcoal-800 w-full focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all"
            >
              {templates?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-4 py-4">
          {/* Grille des jours */}
          {!schedules ? (
            <ScheduleGridSkeleton days={7} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3">
              {daysOfWeek.map((day) => {
                const schedule = getScheduleForDay(day.id);
                const isEnabled = schedule?.enabled || false;
                const time = schedule?.time || '';

                return (
                  <div
                    key={day.id}
                    className={`flex flex-row md:flex-col items-center md:items-stretch p-4 rounded-xl border transition-all duration-200 ${isEnabled
                      ? 'border-terracotta-300 bg-terracotta-50'
                      : 'border-stone-200 bg-stone-50'
                      }`}
                  >
                    {/* Toggle et nom du jour (row on small screens) */}
                    <div className="flex items-center gap-3 mr-3 md:mb-3 md:mr-0">
                      <button
                        onClick={() => handleToggleDay(day.id)}
                        className={`w-10 h-6 rounded-full relative transition-colors duration-200 shrink-0 ${isEnabled ? 'bg-terracotta-500' : 'bg-stone-300'
                          }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isEnabled ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                        />
                      </button>
                      <span className={`font-medium text-sm ${isEnabled ? 'text-charcoal-900' : 'text-stone-500'
                        } whitespace-nowrap`}>
                        {day.name}
                      </span>
                    </div>

                    {/* Input heure */}
                    <div className="flex items-center flex-1 w-full">
                      {isEnabled ? (
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => handleTimeChange(day.id, e.target.value)}
                          className="bg-white border border-stone-300 rounded-lg px-1 py-1 text-charcoal-800 text-sm focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all w-full"
                        />
                      ) : (
                        <span className="text-stone-400 text-xs text-center w-full py-3">-</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Résumé */}
          <div className="flex items-center justify-between py-4 border-t border-stone-200">
            <div className="text-stone-600">
              <span className="text-dustyBlue-600 font-bold">{enabledCount}</span> jour{enabledCount > 1 ? 's' : ''} programmé{enabledCount > 1 ? 's' : ''}
            </div>

            {/* Bouton sauvegarder */}
            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${hasChanges
                ? 'bg-sage-500 hover:bg-sage-600 text-white shadow-vintage hover:shadow-vintage-lg'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
            >
              {isSaving ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Sauvegarde...
                </>
              ) : saveSuccess ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} className="animate-bounce" />
                  Sauvegardé !
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} />
                  Sauvegarder
                </>
              )}
            </button>
          </div>

          {/* Note informative */}
          <p className="text-stone-600 text-sm">
            <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-amber-500" />Les extractions automatiques seront déclenchées aux heures configurées pour <span className="font-medium text-charcoal-900">{sources?.find(s => s.id === selectedSourceId)?.name}</span>.
          </p>
        </div>
      </div>
    </section>
  );
}