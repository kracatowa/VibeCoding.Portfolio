'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faDatabase, faFileExport } from '@fortawesome/free-solid-svg-icons';
import AddSourceForm from '@/components/Admin/AddSourceForm';
import AddTemplateForm from '@/components/Admin/AddTemplateForm';

type ActiveTab = 'sources' | 'templates';

export default function ConfigurationsPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('sources');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FontAwesomeIcon icon={faCog} className="text-blue-400" />
            Configurations
          </h1>
          <p className="text-gray-400">
            Gérez vos sources de données et templates d'export
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'sources'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <FontAwesomeIcon icon={faDatabase} className="mr-2" />
            Sources de données
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'templates'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <FontAwesomeIcon icon={faFileExport} className="mr-2" />
            Templates d'export
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          {activeTab === 'sources' && <AddSourceForm />}
          {activeTab === 'templates' && <AddTemplateForm />}
        </div>
      </div>
    </div>
  );
}
