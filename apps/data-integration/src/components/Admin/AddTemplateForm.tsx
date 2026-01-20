'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { apiFetch } from '@/lib/api/client';

interface TemplateField {
  header: string;
  jsonPath: string;
}

interface TemplateFormData {
  name: string;
  sourceId: string;
  fields: TemplateField[];
}

export default function AddTemplateForm() {
  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    sourceId: '',
    fields: [{ header: '', jsonPath: '' }]
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field: keyof TemplateFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
  };

  const handleFieldChange = (index: number, field: keyof TemplateField, value: string) => {
    const updatedFields = [...formData.fields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setFormData(prev => ({ ...prev, fields: updatedFields }));
    setSaveSuccess(false);
  };

  const addField = () => {
    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, { header: '', jsonPath: '' }]
    }));
  };

  const removeField = (index: number) => {
    if (formData.fields.length === 1) return;
    const updatedFields = formData.fields.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, fields: updatedFields }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await apiFetch('/api/admin/templates', {
        method: 'POST',
        body: formData
      });

      setSaveSuccess(true);
      // Reset form
      setFormData({
        name: '',
        sourceId: '',
        fields: [{ header: '', jsonPath: '' }]
      });

      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      alert('Erreur lors de la sauvegarde du template');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FontAwesomeIcon icon={faPlus} className="text-green-400" />
        Ajouter un nouveau template CSV
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Template Name */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Nom du template <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ex: Export Contacts"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Source Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Source associée <span className="text-red-400">*</span>
          </label>
          <select
            required
            value={formData.sourceId}
            onChange={(e) => handleInputChange('sourceId', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">Sélectionner une source...</option>
            <option value="1">Salesforce</option>
            <option value="2">HubSpot</option>
            <option value="3">Zendesk</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            La source doit être créée au préalable
          </p>
        </div>

        {/* CSV Field Mappings */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-400">
              Mapping des champs CSV
            </label>
            <button
              type="button"
              onClick={addField}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
              Ajouter un champ
            </button>
          </div>

          <div className="space-y-3">
            {formData.fields.map((field, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    required
                    value={field.header}
                    onChange={(e) => handleFieldChange(index, 'header', e.target.value)}
                    placeholder="En-tête CSV (ex: Email)"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    required
                    value={field.jsonPath}
                    onChange={(e) => handleFieldChange(index, 'jsonPath', e.target.value)}
                    placeholder="Chemin JSON (ex: user.email)"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  disabled={formData.fields.length === 1}
                  className={`p-2 rounded-lg transition-colors ${
                    formData.fields.length === 1
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-red-400 hover:bg-red-500/10'
                  }`}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            💡 Le chemin JSON utilise la notation par points (ex: data.items[0].name)
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end pt-4 border-t border-gray-700">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              !isSaving
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
                Créer le template
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
