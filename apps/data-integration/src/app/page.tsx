'use client';

import { useState, useEffect, useCallback } from 'react';
import ExtractionSteps from '@/components/ExtractionSteps';
import ExtractionHistory from '@/components/ExtractionHistory';
import ManualTrigger from '@/components/ManualTrigger';
import AutomaticScheduler from '@/components/AutomaticScheduler';
import { Extraction, SchedulePreference } from '@/lib/database';

interface StepStatus {
  step: number;
  status: 'pending' | 'processing' | 'processed';
}

export default function Home() {
  const [extractions, setExtractions] = useState<Extraction[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [currentExtraction, setCurrentExtraction] = useState<Extraction | null>(null);
  const [stepStatus, setStepStatus] = useState<StepStatus | null>(null);
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);

  // URL for returning to the main portfolio site. Can be overridden via env.
  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL || '/';

  const fetchExtractions = useCallback(async () => {
    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const response = await fetch(`${base}/api/extractions`);
      const data = await response.json();
      setExtractions(data);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    fetchExtractions();
  }, [fetchExtractions]);

  // Polling pour suivre l'extraction en cours
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && currentExtraction) {
      interval = setInterval(async () => {
        try {
          const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
          const response = await fetch(`${base}/api/extractions`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentExtraction.id }),
          });
          const data = await response.json();

          if (data.stepStatus) {
            setStepStatus(data.stepStatus);
          }

          setCurrentExtraction(data);

          if (data.status === 'completed' || data.status === 'failed') {
            setIsRunning(false);
            setStepStatus(null);
            fetchExtractions();
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour du statut:', error);
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentExtraction, fetchExtractions]);

  const handleTriggerExtraction = async (source: string) => {
    setIsRunning(true);
    setStepStatus({ step: 1, status: 'pending' });

    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const response = await fetch(`${base}/api/extractions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source }),
      });
      const data = await response.json();
      setCurrentExtraction(data);
    } catch (error) {
      console.error('Erreur lors du déclenchement de l\'extraction:', error);
      setIsRunning(false);
      setStepStatus(null);
    }
  };

  const handleSaveSchedules = async (schedules: SchedulePreference[]) => {
    setIsSavingSchedule(true);
    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
      await fetch(`${base}/api/schedules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedules }),
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des planifications:', error);
    } finally {
      setIsSavingSchedule(false);
    }
  };

  return (
    <>
            <ManualTrigger
              onTrigger={handleTriggerExtraction}
              isRunning={isRunning}
            />
            <ExtractionSteps
              currentStep={currentExtraction?.currentStep || null}
              stepStatus={stepStatus}
              isRunning={isRunning}
            />
            <ExtractionHistory
              extractions={extractions}
              isLoading={isLoadingHistory}
            />
            
              <AutomaticScheduler
                onSave={handleSaveSchedules}
                isSaving={isSavingSchedule}
              />
      </> 
  );
}
