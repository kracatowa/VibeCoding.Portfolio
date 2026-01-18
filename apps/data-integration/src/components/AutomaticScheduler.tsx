'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSpinner, faCheckCircle, faSave, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { getSources, SchedulePreference, Source } from '@/lib/database';

interface Props {
  onSave: (schedules: SchedulePreference[]) => void;
  isSaving: boolean;
}

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
    enabled: d.id >= 1 && d.id <= 5, // weekdays enabled by default
    time: d.id >= 1 && d.id <= 5 ? '08:00' : '',
  }));


export default function AutomaticScheduler({ onSave, isSaving }: Props) {
  // initialize with sensible defaults so the UI keeps its space
  const [schedules, setSchedules] = useState<SchedulePreference[]>(() => getDefaultSchedules());
  // don't show the global loading placeholder that removes layout;
  // we keep a light-weight fetching state instead if needed
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);


  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [loadingSources, setLoadingSources] = useState(false);

  // fetch schedules whenever selectedSource changes
  useEffect(() => {
    fetchSchedules(selectedSource);

    let mounted = true;
    function loadTemplates() {
          setLoadingSources(true);
          
          try {
            const list = getSources();
            if (mounted) {
              setSources(list);
              setSelectedSource(list[0]?.id || "");
            }
    
          } catch (err) {
            if (mounted) {
              setSources([]);
              setSelectedSource("Default");
            }
          } finally {
            if (mounted) setLoadingSources(false);
          }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    loadTemplates()

  }, []);

  useEffect(() => {
    fetchSchedules(selectedSource);
  }, [selectedSource]);

  const fetchSchedules = async (source: string) => {
    // keep the existing schedules visible while fetching to avoid layout shift
    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const response = await fetch(`${base}/api/schedules?source=${encodeURIComponent(source)}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: SchedulePreference[] = await response.json();
      // fallback to defaults if API returns empty/malformed data
      setSchedules(data && data.length ? data : getDefaultSchedules());
    } catch (error) {
      console.error('Erreur lors du chargement des planifications:', error);
      setSchedules(getDefaultSchedules());
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleDay = (dayOfWeek: number) => {
    setSchedules((prev) =>
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
    setSchedules((prev) =>
      prev.map((s) => (s.dayOfWeek === dayOfWeek ? { ...s, time } : s))
    );
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    // persist for the selected source on the server if needed,
    // keep calling parent onSave(schedules) for existing behavior
    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
      await fetch(`${base}/api/schedules?source=${encodeURIComponent(selectedSource)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schedules),
      });
    } catch (err) {
      console.error('Erreur lors de la sauvegarde locale:', err);
    }

    onSave(schedules);
    setHasChanges(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getScheduleForDay = (dayOfWeek: number): SchedulePreference | undefined => {
    return schedules.find((s) => s.dayOfWeek === dayOfWeek);
  };

  const enabledCount = schedules.filter((s) => s.enabled).length;

  return (
    <section id="automatic-scheduler" className='py-4 px-6 scroll-mt-20'>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span className="text-2xl"><FontAwesomeIcon icon={faClock} /></span>
        Planification automatique
      </h2>

      {/* Source selector */}
      <div className="mb-4">
        <label className="text-sm text-gray-400 mr-2">Source:</label>
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg"
        >
          {sources.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <FontAwesomeIcon icon={faSpinner} spin className="text-2xl text-blue-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Grille des jours */}
          <div className="space-y-3">
            {daysOfWeek.map((day) => {
              const schedule = getScheduleForDay(day.id);
              const isEnabled = schedule?.enabled || false;
              const time = schedule?.time || '';

              return (
                <div
                  key={day.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                    isEnabled
                      ? 'border-blue-500/50 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/30'
                  }`}
                >
                  {/* Toggle et nom du jour */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleToggleDay(day.id)}
                      className={`w-12 h-7 rounded-full relative transition-colors duration-200 ${
                        isEnabled ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                          isEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span
                      className={`font-medium ${
                        isEnabled ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {day.name}
                    </span>
                  </div>

                  {/* Input heure */}
                  <div className="flex items-center gap-2">
                    {isEnabled ? (
                      <>
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => handleTimeChange(day.id, e.target.value)}
                          className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </>
                    ) : (
                      <span className="text-gray-500 text-sm">Désactivé</span>
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
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                hasChanges
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
            <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-yellow-400" />Les extractions automatiques seront déclenchées aux heures configurées pour <span className="font-medium text-white">{selectedSource}</span>.
          </p>
        </div>
      )}
    </section>
  );
}