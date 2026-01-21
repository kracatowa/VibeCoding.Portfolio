'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFlask, faSpinner, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { apiFetch } from '@/lib/api/client';
import Alert from '@/components/Errors/Alert';

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
  const [formError, setFormError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof SourceFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
    setFieldErrors(prev => {
      const copy = { ...prev };
      delete copy[field as string];
      return copy;
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name || !formData.name.trim()) {
      errors.name = 'Le nom de la source est requis';
    }

    if (!formData.apiUrl || !formData.apiUrl.trim()) {
      errors.apiUrl = "L'URL de l'API est requise";
    } else {
      try {
        // validate URL format
        // new URL will throw if invalid
        // allow relative? this expects full URL so require protocol
        const url = new URL(formData.apiUrl);
        if (!url.protocol || !(url.protocol === 'http:' || url.protocol === 'https:')) {
          errors.apiUrl = "L'URL doit commencer par http:// ou https://";
        }
      } catch (e) {
        errors.apiUrl = "URL invalide";
      }
    }

    if (formData.authType !== 'none') {
      if (!formData.authToken || !formData.authToken.trim()) {
        errors.authToken = 'Le token/la clé est requis(e) pour ce type d\'authentification';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTestConnection = async () => {    
    if (!validateForm()) return;
    
    // validate API URL before attempting test
    setTestError('');
    setTestResponse(null);
    if (!formData.apiUrl || !formData.apiUrl.trim()) {
      setFieldErrors(prev => ({ ...prev, apiUrl: "L'URL de l'API est requise" }));
      return;
    }

    try {
      new URL(formData.apiUrl);
    } catch (e) {
      setFieldErrors(prev => ({ ...prev, apiUrl: 'URL invalide' }));
      return;
    }

    setTestStatus('testing');

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

    if (!validateForm()) return;

    if (testStatus !== 'success') {
      setFormError('Veuillez tester la connexion avant de soumettre');
      return;
    }

    setIsSaving(true);

    try {
      await apiFetch('/api/admin/sources', {
        method: 'POST',
        body: {
          ...formData,
          sampleResponse: testResponse
        }
      });

      setSaveSuccess(true);
      setFormError('');
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
      const msg = err instanceof Error ? err.message : String(err);
      setFormError(msg || 'Erreur lors de la sauvegarde de la source');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FontAwesomeIcon icon={faPlus} className="text-sage-500" />
        Add New Source
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Source Name <span className="text-terracotta-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g. Salesforce Production"
            className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 text-charcoal-800 focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all"
          />
          {fieldErrors.name && (
            <p className="text-sm text-terracotta-600 mt-1">{fieldErrors.name}</p>
          )}
        </div>

        {/* API URL */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            REST API URL <span className="text-terracotta-500">*</span>
          </label>
          <input
            type="url"
            required
            value={formData.apiUrl}
            onChange={(e) => handleInputChange('apiUrl', e.target.value)}
            placeholder="https://api.example.com/data"
            className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 text-charcoal-800 focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all"
          />
          {fieldErrors.apiUrl && (
            <p className="text-sm text-terracotta-600 mt-1">{fieldErrors.apiUrl}</p>
          )}
          <p className="text-xs text-stone-600 mt-1">
            API must return JSON
          </p>
        </div>

        {/* Auth Type */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Authentication Type
          </label>
          <select
            value={formData.authType}
            onChange={(e) => handleInputChange('authType', e.target.value as SourceFormData['authType'])}
            className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 text-charcoal-800 focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all"
          >
            <option value="none">None</option>
            <option value="bearer">Bearer Token</option>
            <option value="apikey">API Key</option>
          </select>
        </div>

        {/* Auth Token */}
        {formData.authType !== 'none' && (
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {formData.authType === 'bearer' ? 'Bearer Token' : 'API Key'}
            </label>
            <input
              type="password"
              value={formData.authToken || ''}
              onChange={(e) => handleInputChange('authToken', e.target.value)}
              placeholder="Enter your token/key"
              className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 text-charcoal-800 focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 transition-all"
            />
            {fieldErrors.authToken && (
              <p className="text-sm text-terracotta-600 mt-1">{fieldErrors.authToken}</p>
            )}
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
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-dustyBlue-500 hover:bg-dustyBlue-600 text-white shadow-vintage'
            }`}
          >
            {testStatus === 'testing' ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Testing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faFlask} />
                Test Connection
              </>
            )}
          </button>

          {testStatus === 'success' && (
            <span className="flex items-center gap-2 text-sage-600">
              <FontAwesomeIcon icon={faCheckCircle} />
              Connection successful
            </span>
          )}

          {testStatus === 'error' && (
            <span className="flex items-center gap-2 text-terracotta-600">
              <FontAwesomeIcon icon={faTimesCircle} />
              {testError}
            </span>
          )}
        </div>

        {/* Test Response Preview */}
        {testResponse && (
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-stone-700 mb-2">JSON Response Preview:</h3>
            <pre className="text-xs text-charcoal-700 overflow-x-auto">
              {JSON.stringify(testResponse, null, 2)}
            </pre>
          </div>
        )}

        {/* Alerts: error + success (success shown after save) */}
          {formError && (
            <Alert
              message={formError}
              onDismiss={() => setFormError('')}
              variant="error"
            />
          )}

          {saveSuccess && (
            <Alert
              message="Source enregistrée avec succès"
              onDismiss={() => setSaveSuccess(false)}
              variant="success"
            />
          )}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <p className="text-sm text-stone-600">
            {testStatus !== 'success' && '⚠️ Test connection before submitting'}
          </p>
          <button
            type="submit"
            disabled={testStatus !== 'success' || isSaving}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              testStatus === 'success' && !isSaving
                ? 'bg-sage-500 hover:bg-sage-600 text-white shadow-vintage'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            {isSaving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <FontAwesomeIcon icon={faCheckCircle} className="animate-bounce" />
                Saved!
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} />
                Add Source
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
