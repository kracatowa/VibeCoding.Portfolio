'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSpinner, faCheckCircle, faSave, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useAsyncData } from '@/hooks/asyncResolver';
import { Template } from '@/app/api/templates/templates.dto';
import { Schedule, SchedulePreference } from '@/app/api/schedules/schedules.dto';
import { apiFetch } from '@/lib/api/client';
import ErrorAlert from './Errors/ErrorAlert';

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
    fetcher: () => apiFetch('/api/sources') as Promise<Template[]>,
    dependencies: [],
  });

  useEffect(() => {
    if(!sources) return;
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

  const getScheduleForDay = (dayOfWeek: number): SchedulePreference | undefined => {
    return selectedSchedulePreferences.find((s) => s.dayOfWeek === dayOfWeek);
  };

  const enabledCount = selectedSchedulePreferences.filter((s) => s.enabled).length;

  return (
    <section id="automatic-scheduler" className='py-4 px-6 scroll-mt-20'>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span className="text-2xl"><FontAwesomeIcon icon={faClock} /></span>
        Planification automatique
      </h2>

      {/* Error alerts */}
      {sourcesError && (
        <ErrorAlert 
          message={`Erreur lors du chargement des sources: ${sourcesError.message}`}
          onRetry={refetchSources}
        />
      )}
      {templatesError && (
        <ErrorAlert 
          message={`Erreur lors du chargement des templates: ${templatesError.message}`}
          onRetry={refetchTemplates}
        />
      )}
      {schedulesError && (
        <ErrorAlert 
          message={`Erreur lors du chargement des horaires: ${schedulesError.message}`}
          onRetry={refetchSchedules}
        />
      )}

      {/* Source & Template selector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Source selector */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-3">Source</label>
          <select
            value={selectedSourceId}
            onChange={(e) => setSelectedSourceId(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-gray-200 w-full"
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
          <label className="block text-sm font-medium text-gray-400 mb-3">Template</label>
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-gray-200 w-full"
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {daysOfWeek.map((day) => {
            const schedule = getScheduleForDay(day.id);
            const isEnabled = schedule?.enabled || false;
            const time = schedule?.time || '';

            return (
              <div
                  key={day.id}
                  className={`flex flex-row md:flex-col items-center md:items-stretch p-4 rounded-xl border transition-all duration-200 ${isEnabled
                      ? 'border-blue-500/50 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/30'
                    }`}
                >
                  {/* Toggle et nom du jour (row on small screens) */}
                  <div className="flex items-center gap-3 mr-3 md:mb-3 md:mr-0">
                    <button
                      onClick={() => handleToggleDay(day.id)}
                      className={`w-10 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0 ${isEnabled ? 'bg-blue-500' : 'bg-gray-600'
                        }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isEnabled ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                      />
                    </button>
                    <span className={`font-medium text-sm ${isEnabled ? 'text-white' : 'text-gray-400'} whitespace-nowrap`}>
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
                        className="bg-gray-800 border border-gray-600 rounded-lg px-1 py-1 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors w-full"
                      />
                    ) : (
                      <span className="text-gray-500 text-xs text-center w-full py-3">-</span>
                    )}
                  </div>
                </div>
            );
          })}
        </div>

        {/* Résumé */}
        <div className="flex items-center justify-between py-4 border-t border-gray-700">
          <div className="text-gray-400">
            <span className="text-blue-400 font-bold">{enabledCount}</span> jour
            {enabledCount > 1 ? 's' : ''} planifié{enabledCount > 1 ? 's' : ''}
          </div>

          {/* Bouton sauvegarder */}
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${hasChanges
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
          >
            {isSaving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Sauvegarde...
              </>
            ) : saveSuccess ? (
              <>
                <FontAwesomeIcon icon={faCheckCircle} />
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
        <p className="text-gray-500 text-sm">
          <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-yellow-400" />Les extractions automatiques seront déclenchées aux heures configurées pour <span className="font-medium text-white">{sources?.find(s => s.id === selectedSourceId)?.name}</span>.
        </p>
      </div>

    </section>
  );
}