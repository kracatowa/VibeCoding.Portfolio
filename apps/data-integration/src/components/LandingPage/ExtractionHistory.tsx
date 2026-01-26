'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faScroll,
  faInbox,
  faFileAlt,
  faCheckCircle,
  faSpinner,
  faTimesCircle,
  faPauseCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Extraction } from '@/app/api/extractions/extractions.dto';
import { TableRowSkeleton } from '../Utilities/Skeleton';

interface Props {
  extractions: Extraction[];
  isLoading: boolean;
}

const STATUS_CONFIG = {
  completed: {
    icon: faCheckCircle,
    text: 'Terminé',
    classes: 'bg-sage-100 text-sage-700 border border-sage-300',
    badgeClasses: 'bg-sage-100 text-sage-700 border border-sage-300',
    iconClasses: 'text-sage-600',
    spin: false
  },
  running: {
    icon: faSpinner,
    text: 'En cours',
    classes: 'bg-amber-100 text-amber-700 border border-amber-300',
    badgeClasses: 'bg-amber-100 text-amber-700 border border-amber-300 animate-pulse',
    iconClasses: 'text-amber-600',
    spin: true
  },
  failed: {
    icon: faTimesCircle,
    text: 'Échoué',
    classes: 'bg-terracotta-100 text-terracotta-700 border border-terracotta-300',
    badgeClasses: 'bg-terracotta-100 text-terracotta-700 border border-terracotta-300',
    iconClasses: 'text-terracotta-600',
    spin: false
  },
  pending: {
    icon: faPauseCircle,
    text: 'En attente',
    classes: 'bg-stone-100 text-stone-600 border border-stone-300',
    badgeClasses: 'bg-stone-100 text-stone-600 border border-stone-300',
    iconClasses: 'text-stone-500',
    spin: false
  }
} as const;

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

  const getStatusConfig = (status: Extraction['status']) => {
    return STATUS_CONFIG[status] || null;
  };

  const getStatusIcon = (status: Extraction['status']) => {
    const config = getStatusConfig(status);
    if (!config) return null;
    return (
      <FontAwesomeIcon
        icon={config.icon}
        spin={config.spin}
        className={`${config.iconClasses} mr-2`}
      />
    );
  };

  const getStatusText = (status: Extraction['status']): string => {
    return getStatusConfig(status)?.text || '';
  };

  const getStatusClasses = (status: Extraction['status']): string => {
    return getStatusConfig(status)?.classes || '';
  };

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
    <section id="extraction-history" className="py-4 px-6 scroll-mt-20">
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-vintage">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-charcoal-900">
          <span className="text-2xl text-terracotta-500"><FontAwesomeIcon icon={faScroll} /></span>
          Extraction History
        </h2>

        <div className="overflow-x-auto w-full">
          <table className="w-auto table-auto min-w-full border-collapse">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left py-3 px-4 text-stone-600 font-medium">Source</th>
                <th className="text-left py-3 px-4 text-stone-600 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-stone-600 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-stone-600 font-medium">Duration</th>
                <th className="text-left py-3 px-4 text-stone-600 font-medium">Records</th>
                <th className="text-left py-3 px-4 text-stone-600 font-medium">Template</th>
                <th className="text-left py-3 px-4 text-stone-600 font-medium">Destination</th>
                <th className="text-left py-3 px-4 text-stone-600 font-medium">Interval</th>
                <th className="text-left py-3 px-4 text-stone-600 font-medium">File</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} columns={9} />)
              ) : extractions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-stone-500">
                    <span className="text-4xl text-stone-400"><FontAwesomeIcon icon={faInbox} /></span>
                    <p className="mt-2">No extractions recorded</p>
                  </td>
                </tr>
              ) : (
                extractions.map((extraction) => (
                  <tr
                    key={extraction.id}
                    className="border-b border-stone-100 hover:bg-stone-50 transition-colors"
                  >
                    {/* Source */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium whitespace-nowrap text-charcoal-800">{extraction.source.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-charcoal-600 whitespace-nowrap">
                      {formatDate(extraction.startedAt)}
                    </td>
                    {/* Statut */}
                    <td className="py-4 px-4 flex">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(extraction.status)} flex items-start`}>
                        {getStatusIcon(extraction.status)}
                        {getStatusText(extraction.status)}
                      </span>
                    </td>
                    {/* Durée */}
                    <td className="py-4 px-4 text-charcoal-600 whitespace-nowrap">
                      {getDuration(extraction.startedAt, extraction.completedAt)}
                    </td>
                    {/* Nombre d'enregistrement */}
                    <td className="py-4 px-4">
                      {extraction.recordsCount !== undefined ? (
                        <span className="text-dustyBlue-600 font-medium">
                          {extraction.recordsCount.toLocaleString('fr-CA')}
                        </span>
                      ) : extraction.error ? (
                        <span className="text-terracotta-600 text-sm" title={extraction.error}>
                          Error
                        </span>
                      ) : (
                        <span className="text-stone-400">-</span>
                      )}
                    </td>
                    {/* Template */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium whitespace-nowrap text-charcoal-800">{extraction.template?.name}</span>
                      </div>
                    </td>
                    {/* Destination */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium whitespace-nowrap text-charcoal-800">{extraction.destination?.name}</span>
                      </div>
                    </td>
                    {/* Interval */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium whitespace-nowrap text-charcoal-800">{extraction.interval}</span>
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Statistiques */}
        {extractions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-dustyBlue-600">{extractions.length}</p>
              <p className="text-stone-600 text-sm">Total Extractions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-sage-600">
                {extractions.filter((e) => e.status === 'completed').length}
              </p>
              <p className="text-stone-600 text-sm">Successful</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-terracotta-600">
                {extractions.filter((e) => e.status === 'failed').length}
              </p>
              <p className="text-stone-600 text-sm">Failed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-lavender-600">
                {extractions
                  .filter((e) => e.recordsCount)
                  .reduce((acc, e) => acc + (e.recordsCount || 0), 0)
                  .toLocaleString('fr-CA')}
              </p>
              <p className="text-stone-600 text-sm">Records Processed</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
