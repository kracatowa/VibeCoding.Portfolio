 'use client';

import { useEffect, useState } from 'react';
import type React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface ExtractionStep {
  id: number;
  name: string;
  description: string;
}

interface Props {
  currentStep: number | null;
  stepStatus: StepStatus | null;
  isRunning: boolean;
}

interface StepStatus {
  step: number;
  status: StatusKey;
}

export const STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  PROCESSED: 'processed',
  FAILED: 'failed',
} as const;
export type StatusKey = typeof STATUS[keyof typeof STATUS];

const steps: ExtractionStep[] = [
  { id: 1, name: 'Appel des APIs', description: 'Récupération des données depuis la source' },
  { id: 2, name: 'Nettoyage des données', description: 'Validation et normalisation des données' },
  { id: 3, name: 'Création du fichier', description: 'Génération du fichier CSV' },
  { id: 4, name: 'Dépôt du fichier', description: 'Transfert vers la destination' },
];

export default function ExtractionSteps({ currentStep, stepStatus, isRunning }: Props) {
  const [animatedStep, setAnimatedStep] = useState<number | null>(null);

  useEffect(() => {
    if (stepStatus?.status === STATUS.PROCESSING) {
      setAnimatedStep(stepStatus.step);
    } else {
      setAnimatedStep(null);
    }
  }, [stepStatus]);

  const getStepIcon = (stepId: number): React.ReactNode => {
    const statusKey = getStepStatusKey(stepId);
    switch (statusKey) {
      case STATUS.PROCESSING:
        return <FontAwesomeIcon icon={faSpinner} spin className='text-yellow-400'/>;
      case STATUS.PROCESSED:
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />;
      default:
        return <FontAwesomeIcon icon={faPauseCircle} className='text-blue-400'/>;
    }
  };

  const STATUS_TEXT: Record<StepStatus['status'], string> = {
    [STATUS.PENDING]: 'En attente',
    [STATUS.PROCESSING]: 'En cours...',
    [STATUS.PROCESSED]: 'Terminé',
    [STATUS.FAILED]: 'Échoué',
  };

  const getStepStatusKey = (stepId: number): StepStatus['status'] => {
    // 1) If the server/prop reports an explicit status for this step, honor it.
    if (stepStatus && stepId === stepStatus.step) {
      return stepStatus.status;
    }

    // 2) If there's no current step defined, treat as pending.
    if (currentStep === null) {
      return STATUS.PENDING;
    }

    // 3) If this step is before the current step, it's processed.
    if (stepId < currentStep) {
      return STATUS.PROCESSED;
    }

    // 4) If this is the current step, prefer a reported "processed" status,
    //    otherwise determine from whether the extraction is running.
    if (stepId === currentStep) {
      if (stepStatus?.status === STATUS.PROCESSED) return STATUS.PROCESSED;
      return isRunning ? STATUS.PROCESSING : STATUS.PROCESSED;
    }

    // 5) Any other case is pending.
    return STATUS.PENDING;
  };

  const getStepStatusText = (stepId: number): string => STATUS_TEXT[getStepStatusKey(stepId)];

  const getStatusClasses = (stepId: number): string => {
    const status = getStepStatusKey(stepId);
    if (status === STATUS.PROCESSED) return 'bg-green-500/20 text-green-400';
    if (status === STATUS.PROCESSING) return 'bg-yellow-500/20 text-yellow-400';
    if (status === STATUS.FAILED) return 'bg-red-500/20 text-red-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  /**
   * getStepClasses
   * Decide the card/container classes for a step based on its computed status key.
   * Uses `getStepStatusKey` so the visual logic follows the same canonical status decisions.
   */
  const getStepClasses = (stepId: number): string => {
    const baseClasses = 'relative p-6 rounded-xl border-2 transition-all duration-300';

    // If nothing is running and there's no current step, show a subdued card.
    if (!isRunning && currentStep === null) {
      return `${baseClasses} bg-gray-800/50 border-gray-700`;
    }

    // Use the canonical status key for this step and map it to styles.
    const status = getStepStatusKey(stepId);

    switch (status) {
      case STATUS.PROCESSING:
        return `${baseClasses} bg-yellow-500/10 border-yellow-500 shadow-lg shadow-yellow-500/20`;
      case STATUS.PROCESSED:
        return `${baseClasses} bg-green-500/10 border-green-500`;
      case STATUS.FAILED:
        return `${baseClasses} bg-red-500/10 border-red-500`;
      default:
        return `${baseClasses} bg-blue-500/10 border-blue-500`;
    }
  };

  // Total number of steps (used for progress computation)
  const totalSteps = steps.length;

  // Compute progress percentage (0-100). Use 0 when no current step.
  const progressPercent = Math.max(
    0,
    Math.min(100, ((currentStep ?? 0) / Math.max(1, totalSteps)) * 100)
  );

  return (
   <section id="extraction-steps" className="py-4 px-6 scroll-mt-20">
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Étapes de l&apos;extraction
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.id} className={`${getStepClasses(step.id)} flex flex-col`}>
              {/* Numéro de l'étape */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 border-2 border-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                {step.id}
              </div>

              {/* Emoji de statut */}
              <div className="text-4xl mb-3">
                <span className="inline-block">
                  {getStepIcon(step.id)}
                </span>
              </div>

              {/* Nom de l'étape */}
              <h3 className="font-semibold text-lg mb-1">{step.name}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-2">{step.description}</p>

              {/* Statut */}
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusClasses(step.id)} self-end mt-auto`}>
                {getStepStatusText(step.id)}
              </span>
            </div>
          ))}
        </div>

        {/* Barre de progression */}
        {(isRunning || currentStep !== null) && (
          <div className="mt-6">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>
            <p className="text-center text-gray-400 text-sm mt-2">
              Étape {currentStep ?? 0} sur {totalSteps}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
