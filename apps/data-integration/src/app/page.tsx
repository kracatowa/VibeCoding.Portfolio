'use client';

import { useState, useEffect, useCallback } from 'react';
import ExtractionSteps from '@/components/ExtractionSteps';
import ExtractionHistory from '@/components/ExtractionHistory';
import ManualTrigger from '@/components/ManualTrigger';
import AutomaticScheduler from '@/components/AutomaticScheduler';
import ErrorBoundaryTest from '@/components/Errors/ErrorBoundaryTest';
import ErrorAlertTest from '@/components/Errors/ErrorAlertTest';
import { useNotificationContext } from '@/hooks/NotificationContext';
import { Extraction } from './api/extractions/extractions.dto';

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

  // Get notification functions from context
  const { addNotification } = useNotificationContext();

  // URL for returning to the main portfolio site. Can be overridden via env.
  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL || '/';

  //TODO : ADD ERROR DISPLAY FOR NETWORK FAILURES
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
            // Add notification for completion or failure
            addNotification(
              data.status === 'completed' ? 'success' : 'error',
              data.id,
              data.source?.name || data.source || 'Source inconnue'
            );
            
            setIsRunning(false);
            setStepStatus(null);
            fetchExtractions();
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour du statut:', error);
        }
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentExtraction, fetchExtractions]);

  const handleTriggerExtraction = async (sourceId: string, destinationId: string, templateId: string, interval: string) => {
    setIsRunning(true);
    setStepStatus({ step: 1, status: 'pending' });

    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const response = await fetch(`${base}/api/extractions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId, templateId, destinationId, interval }),
      });
      const data = await response.json();
      setCurrentExtraction(data);
      
      // Add notification for extraction start
      addNotification('start', data.id, data.source?.name || data.source || 'Source inconnue');
    } catch (error) {
      console.error('Erreur lors du déclenchement de l\'extraction:', error);
      setIsRunning(false);
      setStepStatus(null);
    }
  };

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <>
       {isDevelopment && <ErrorBoundaryTest />}
       {isDevelopment && <ErrorAlertTest />}

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
              />
      </> 
  );
}
