'use client';

import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
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
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Me <span className="gradient-text">Contacter</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Vous avez un projet en tête ou souhaitez discuter d&apos;une opportunité ?
            Je serais ravi d&apos;échanger avec vous.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <a
            href="mailto:ocean.barras@hotmail.com"
            className="card p-6 text-center group hover:border-sky-500"
          >
            <div className="text-sky-500 mb-4 flex justify-center">
              <FontAwesomeIcon icon={faEnvelope} className="w-10 h-10" />
            </div>
            <h3 className="font-semibold mb-2">Courriel</h3>
            <p className="text-gray-400 text-sm group-hover:text-sky-500 transition-colors">
              ocean.barras@hotmail.com
            </p>
          </a>

          <a
            href="tel:418-520-5929"
            className="card p-6 text-center group hover:border-sky-500"
          >
            <div className="text-sky-500 mb-4 flex justify-center">
              <FontAwesomeIcon icon={faPhone} className="w-10 h-10" />
            </div>
            <h3 className="font-semibold mb-2">Téléphone</h3>
            <p className="text-gray-400 text-sm group-hover:text-sky-500 transition-colors">
              418-520-5929
            </p>
          </a>

          <a
            href="https://linkedin.com/in/ocean-barras"
            target="_blank"
            rel="noopener noreferrer"
            className="card p-6 text-center group hover:border-sky-500"
          >
            <div className="text-sky-500 mb-4 flex justify-center">
              <FontAwesomeIcon icon={faLinkedin} className="w-10 h-10" />
            </div>
            <h3 className="font-semibold mb-2">LinkedIn</h3>
            <p className="text-gray-400 text-sm group-hover:text-sky-500 transition-colors">
              linkedin.com/in/ocean-barras
            </p>
          </a>
        </div>
        
        <div className="card p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">Envoyez-moi un message</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full p-4 bg-slate-900/80 border border-white/10 rounded-lg text-slate-100 transition-all focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-gray-500"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Courriel *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-4 bg-slate-900/80 border border-white/10 rounded-lg text-slate-100 transition-all focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-gray-500"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full p-4 bg-slate-900/80 border border-white/10 rounded-lg text-slate-100 transition-all focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-gray-500"
                  placeholder="Votre entreprise"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Sujet *
                </label>
                <select
                  id="subject"
                  required
                  className="w-full p-4 bg-slate-900/80 border border-white/10 rounded-lg text-slate-100 transition-all focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="project">Projet de développement</option>
                  <option value="consulting">Consultation technique</option>
                  <option value="job">Opportunité d&apos;emploi</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full p-4 bg-slate-900/80 border border-white/10 rounded-lg text-slate-100 transition-all focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 placeholder:text-gray-500 resize-none"
                placeholder="Décrivez votre projet ou votre demande..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" />
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer le message'
                )}
              </button>
            </div>
            {status === 'success' && (
              <div className="text-center text-green-400 bg-green-400/10 p-4 rounded-lg">
                ✓ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
              </div>
            )}

            {status === 'error' && (
              <div className="text-center text-red-400 bg-red-400/10 p-4 rounded-lg">
                ✗ Une erreur est survenue. Veuillez réessayer ou me contacter directement par courriel.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
