'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFlask, faSpinner, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { apiFetch } from '@/lib/api/client';

interface SourceFormData {
  name: string;
  apiUrl: string;
  authType: 'none' | 'bearer' | 'apikey';
  authToken?: string;
  headers?: Record<string, string>;
}

type TestStatus = 'idle' | 'testing' | 'success' | 'error';

export default function AddSourceForm() {
  const [formData, setFormData] = useState<SourceFormData>({
    name: '',
    apiUrl: '',
    authType: 'none',
    headers: {}
  });

  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [testResponse, setTestResponse] = useState<any>(null);
  const [testError, setTestError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field: keyof SourceFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setTestError('');
    setTestResponse(null);

    try {
      const response = await apiFetch('/api/admin/test-source', {
        method: 'POST',
        body: {
          apiUrl: formData.apiUrl,
          authType: formData.authType,
          authToken: formData.authToken,
          headers: formData.headers
        }
      });

      setTestResponse(response);
      setTestStatus('success');
    } catch (err) {
      setTestError(err instanceof Error ? err.message : 'Échec de la connexion');
      setTestStatus('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (testStatus !== 'success') {
      alert('Veuillez tester la connexion avant de soumettre');
      return;
    }

    setIsSaving(true);

    try {
      await apiFetch('/api/admin/sources', {
        method: 'POST',
        body: formData
      });

      setSaveSuccess(true);
      // Reset form
      setFormData({
        name: '',
        apiUrl: '',
        authType: 'none',
        headers: {}
      });
      setTestStatus('idle');
      setTestResponse(null);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      alert('Erreur lors de la sauvegarde de la source');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FontAwesomeIcon icon={faPlus} className="text-green-400" />
        Ajouter une nouvelle source
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Nom de la source <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ex: Salesforce Production"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* API URL */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            URL de l'API REST <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            required
            value={formData.apiUrl}
            onChange={(e) => handleInputChange('apiUrl', e.target.value)}
            placeholder="https://api.example.com/data"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">
            L'API doit retourner du JSON
          </p>
        </div>

        {/* Auth Type */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Type d'authentification
          </label>
          <select
            value={formData.authType}
            onChange={(e) => handleInputChange('authType', e.target.value as SourceFormData['authType'])}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="none">Aucune</option>
            <option value="bearer">Bearer Token</option>
            <option value="apikey">API Key</option>
          </select>
        </div>

        {/* Auth Token */}
        {formData.authType !== 'none' && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {formData.authType === 'bearer' ? 'Bearer Token' : 'API Key'}
            </label>
            <input
              type="password"
              value={formData.authToken || ''}
              onChange={(e) => handleInputChange('authToken', e.target.value)}
              placeholder="Entrez votre token/clé"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        )}

        {/* Test Connection Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={!formData.apiUrl || testStatus === 'testing'}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              testStatus === 'testing'
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {testStatus === 'testing' ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Test en cours...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faFlask} />
                Tester la connexion
              </>
            )}
          </button>

          {testStatus === 'success' && (
            <span className="flex items-center gap-2 text-green-400">
              <FontAwesomeIcon icon={faCheckCircle} />
              Connexion réussie
            </span>
          )}

          {testStatus === 'error' && (
            <span className="flex items-center gap-2 text-red-400">
              <FontAwesomeIcon icon={faTimesCircle} />
              {testError}
            </span>
          )}
        </div>

        {/* Test Response Preview */}
        {testResponse && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Aperçu de la réponse JSON:</h3>
            <pre className="text-xs text-gray-300 overflow-x-auto">
              {JSON.stringify(testResponse, null, 2)}
            </pre>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            {testStatus !== 'success' && '⚠️ Testez la connexion avant de soumettre'}
          </p>
          <button
            type="submit"
            disabled={testStatus !== 'success' || isSaving}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              testStatus === 'success' && !isSaving
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSaving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Enregistrement...
              </>
            ) : saveSuccess ? (
              <>
                <FontAwesomeIcon icon={faCheckCircle} className="animate-bounce" />
                Enregistré !
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} />
                Ajouter la source
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
