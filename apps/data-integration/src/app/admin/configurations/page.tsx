'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDatabase, faFileExport } from '@fortawesome/free-solid-svg-icons';
import AddSourceForm from '@/components/Admin/AddSourceForm';
import AddTemplateForm from '@/components/Admin/AddTemplateForm';

type ActiveTab = 'sources' | 'templates';

export default function ConfigurationsPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('sources');

  return (
    <div className="min-h-screen bg-white text-charcoal-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FontAwesomeIcon icon={faCog} className="text-terracotta-500" />
            Configurations
          </h1>
          <p className="text-stone-600">
            Manage your data sources and export templates
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'sources'
                ? 'border-terracotta-500 text-terracotta-600'
                : 'border-transparent text-stone-500 hover:text-charcoal-700'
            }`}
          >
            <FontAwesomeIcon icon={faDatabase} className="mr-2" />
            Data Sources
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'templates'
                ? 'border-terracotta-500 text-terracotta-600'
                : 'border-transparent text-stone-500 hover:text-charcoal-700'
            }`}
          >
            <FontAwesomeIcon icon={faFileExport} className="mr-2" />
            Export Templates
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-vintage">
          {activeTab === 'sources' && <AddSourceForm />}
          {activeTab === 'templates' && <AddTemplateForm />}
        </div>
      </div>
    </div>
  );
}
