'use client';

import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    budget: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          budget: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-emerald-400 mb-4 flex justify-center">
          <FontAwesomeIcon icon={faCheckCircle} className="w-12 h-12" />
        </div>
        <h3 className="text-xl font-medium text-zinc-200 mb-2">Message envoyé!</h3>
        <p className="text-zinc-500 mb-6">
          Merci pour votre message. Je vous répondrai dans les 24 heures.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-cyan-400 hover:text-cyan-300 font-medium text-sm"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded flex items-center gap-3">
          <FontAwesomeIcon icon={faExclamationCircle} className="w-5 h-5 shrink-0" />
          <p className="text-sm">
            Une erreur est survenue. Veuillez réessayer ou me contacter directement par
            courriel.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-medium mb-2 text-zinc-500 uppercase tracking-wider">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full p-3 bg-dark-400 border border-zinc-800 rounded text-zinc-200 text-sm transition-all focus:outline-none focus:border-cyan-400 placeholder:text-zinc-600"
            placeholder="Votre nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium mb-2 text-zinc-500 uppercase tracking-wider">
            Courriel *
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full p-3 bg-dark-400 border border-zinc-800 rounded text-zinc-200 text-sm transition-all focus:outline-none focus:border-cyan-400 placeholder:text-zinc-600"
            placeholder="votre@courriel.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-xs font-medium mb-2 text-zinc-500 uppercase tracking-wider">
            Entreprise
          </label>
          <input
            type="text"
            id="company"
            className="w-full p-3 bg-dark-400 border border-zinc-800 rounded text-zinc-200 text-sm transition-all focus:outline-none focus:border-cyan-400 placeholder:text-zinc-600"
            placeholder="Votre entreprise (optionnel)"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-xs font-medium mb-2 text-zinc-500 uppercase tracking-wider">
            Budget estimé
          </label>
          <select
            id="budget"
            className="w-full p-3 bg-dark-400 border border-zinc-800 rounded text-zinc-200 text-sm transition-all focus:outline-none focus:border-cyan-400"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          >
            <option value="">Sélectionner (optionnel)</option>
            <option value="less-5k">Moins de 5 000 $</option>
            <option value="5k-15k">5 000 $ - 15 000 $</option>
            <option value="15k-50k">15 000 $ - 50 000 $</option>
            <option value="more-50k">Plus de 50 000 $</option>
            <option value="unknown">Je ne sais pas encore</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-medium mb-2 text-zinc-500 uppercase tracking-wider">
          Type de projet *
        </label>
        <select
          id="subject"
          required
          className="w-full p-3 bg-dark-400 border border-zinc-800 rounded text-zinc-200 text-sm transition-all focus:outline-none focus:border-cyan-400"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        >
          <option value="">Sélectionner un type de projet</option>
          <option value="development">Développement d'application</option>
          <option value="integration">Intégration de données</option>
          <option value="cloud">Migration/Architecture cloud</option>
          <option value="automation">Automatisation de processus</option>
          <option value="consulting">Consultation technique</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium mb-2 text-zinc-500 uppercase tracking-wider">
          Description du projet *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="w-full p-3 bg-dark-400 border border-zinc-800 rounded text-zinc-200 text-sm transition-all focus:outline-none focus:border-cyan-400 placeholder:text-zinc-600 resize-y"
          placeholder="Décrivez votre projet, vos objectifs et vos contraintes..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center px-8 py-3 rounded text-sm font-medium border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {status === 'loading' ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="w-4 h-4 mr-2" />
              Envoi en cours...
            </>
          ) : (
            'Envoyer le message'
          )}
        </button>
      </div>

      <p className="text-xs text-zinc-600 text-center">
        En soumettant ce formulaire, vous acceptez que je vous contacte concernant votre projet.
      </p>
    </form>
  );
}
