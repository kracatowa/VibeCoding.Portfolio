'use client';

import type React from 'react';
import { Extraction } from '@/lib/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faScroll,
  faInbox,
  faFileAlt,
  faCheckCircle,
  faSpinner,
  faTimesCircle,
  faPauseCircle,
  faCloud,
  faChartLine,
  faTicket,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  extractions: Extraction[];
  isLoading: boolean;
}

export default function ExtractionHistory({ extractions, isLoading }: Props) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: Extraction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Terminé
          </span>
        );
      case 'running':
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 animate-pulse">
            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> En cours
          </span>
        );
      case 'failed':
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400">
            <FontAwesomeIcon icon={faTimesCircle} className="mr-2" /> Échoué
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-500/20 text-gray-400">
            <FontAwesomeIcon icon={faPauseCircle} className="mr-2" /> En attente
          </span>
        );
      default:
        return null;
    }
  };

  const GetStatusIcon = (status: Extraction['status']) => {
    switch (status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 mr-2" />;
      case 'running':
        return <FontAwesomeIcon icon={faSpinner} spin className="text-yellow-400 mr-2" />;
      case 'failed':
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-400 mr-2" />;
      case 'pending':
        return <FontAwesomeIcon icon={faPauseCircle} className="text-gray-400 mr-2" />;
      default:
        return null;
    }
  }

  const GetStatusClasses = (status: Extraction['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'running':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      case 'pending':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return '';
    }
  }
  
  const GetStatusText = (status: Extraction['status']): string => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'running':
        return 'En cours';
      case 'failed':
        return 'Échoué';
      case 'pending':
        return 'En attente';
      default:
        return '';
    }
  }

  const getDuration = (startedAt: string, completedAt?: string): string => {
    if (!completedAt) return '-';
    const start = new Date(startedAt).getTime();
    const end = new Date(completedAt).getTime();
    const durationMs = end - start;
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  };


  return (
    <section className="py-4 px-6">
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl"><FontAwesomeIcon icon={faScroll} /></span>
          Historique des extractions
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-2xl" />
          </div>
        ) : extractions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <span className="text-4xl"><FontAwesomeIcon icon={faInbox} /></span>
            <p className="mt-2">Aucune extraction enregistrée</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-auto table-auto min-w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Source</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Statut</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Durée</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Enregistrements</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Template</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Destination</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Fichier</th>
                </tr>
              </thead>
              <tbody>
                {extractions.map((extraction) => (
                  <tr
                    key={extraction.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    {/* Source */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium whitespace-nowrap">{extraction.source}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300 whitespace-nowrap">
                      {formatDate(extraction.startedAt)}
                    </td>
                    {/* Statut */}
                    <td className="py-4 px-4 flex">
                      {
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${GetStatusClasses(extraction.status)} flex items-start`}>
                          ­{GetStatusIcon(extraction.status)}
                          {GetStatusText(extraction.status)}
                        </span>
                      } 
                    </td>
                    {/* Durée */}
                    <td className="py-4 px-4 text-gray-300 whitespace-nowrap">
                      {getDuration(extraction.startedAt, extraction.completedAt)}
                    </td>
                    {/* Nombre d'enregistrement */}
                    <td className="py-4 px-4">
                      {extraction.recordsCount !== undefined ? (
                        <span className="text-blue-400 font-medium">
                          {extraction.recordsCount.toLocaleString('fr-CA')}
                        </span>
                      ) : extraction.error ? (
                        <span className="text-red-400 text-sm" title={extraction.error}>
                          Erreur
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    {/* Template */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium whitespace-nowrap">{extraction.template}</span>
                      </div>
                    </td>
                    {/* Destination */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium whitespace-nowrap">{extraction.destination}</span>
                      </div>
                    </td>
                    {/* Filename */}
                    <td className="py-4 px-4">
                      {extraction.fileName ? (
                        <span className="text-green-400 text-sm font-mono flex">
                          <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> 
                          <span className="whitespace-nowrap">{extraction.fileName}</span>
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Statistiques */}
        {extractions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{extractions.length}</p>
              <p className="text-gray-400 text-sm">Total extractions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {extractions.filter((e) => e.status === 'completed').length}
              </p>
              <p className="text-gray-400 text-sm">Réussies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">
                {extractions.filter((e) => e.status === 'failed').length}
              </p>
              <p className="text-gray-400 text-sm">Échouées</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">
                {extractions
                  .filter((e) => e.recordsCount)
                  .reduce((acc, e) => acc + (e.recordsCount || 0), 0)
                  .toLocaleString('fr-CA')}
              </p>
              <p className="text-gray-400 text-sm">Enregistrements traités</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
