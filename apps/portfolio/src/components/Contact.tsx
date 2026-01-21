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
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-title">
            <span className="text-dustyBlue-600 font-semibold">Contact</span>
          </h2>
          <p className="section-subtitle">
            Let's connect
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href="mailto:ocean.barras@hotmail.com"
            className="card p-8 text-center group hover:border-terracotta-300"
          >
            <div className="text-terracotta-500 mb-4 flex justify-center">
              <FontAwesomeIcon icon={faEnvelope} className="w-10 h-10" />
            </div>
            <h3 className="font-medium mb-2 text-charcoal-800">Email</h3>
            <p className="text-stone-500 text-sm group-hover:text-dustyBlue-600 transition-colors">
              ocean.barras@hotmail.com
            </p>
          </a>

          <a
            href="tel:418-520-5929"
            className="card p-8 text-center group hover:border-dustyBlue-300"
          >
            <div className="text-dustyBlue-500 mb-4 flex justify-center">
              <FontAwesomeIcon icon={faPhone} className="w-10 h-10" />
            </div>
            <h3 className="font-medium mb-2 text-charcoal-800">Phone</h3>
            <p className="text-stone-500 text-sm group-hover:text-dustyBlue-600 transition-colors">
              418-520-5929
            </p>
          </a>

          <a
            href="https://linkedin.com/in/ocean-barras"
            target="_blank"
            rel="noopener noreferrer"
            className="card p-8 text-center group hover:border-sage-300"
          >
            <div className="text-sage-500 mb-4 flex justify-center">
              <FontAwesomeIcon icon={faLinkedin} className="w-10 h-10" />
            </div>
            <h3 className="font-medium mb-2 text-charcoal-800">LinkedIn</h3>
            <p className="text-stone-500 text-sm group-hover:text-sage-600 transition-colors">
              linkedin.com/in/ocean-barras
            </p>
          </a>
        </div>
        
        <div className="card p-10">
          <h3 className="text-2xl font-light mb-8 text-center">Send a message</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-stone-700">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full p-4 bg-white border-2 border-stone-200 rounded-lg text-charcoal-800 transition-all focus:outline-none focus:border-dustyBlue-400 focus:ring-2 focus:ring-dustyBlue-100 placeholder:text-stone-300"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-stone-700">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-4 bg-white border-2 border-stone-200 rounded-lg text-charcoal-800 transition-all focus:outline-none focus:border-dustyBlue-400 focus:ring-2 focus:ring-dustyBlue-100 placeholder:text-stone-300"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2 text-stone-700">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full p-4 bg-white border-2 border-stone-200 rounded-lg text-charcoal-800 transition-all focus:outline-none focus:border-dustyBlue-400 focus:ring-2 focus:ring-dustyBlue-100 placeholder:text-stone-300"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-stone-700">
                  Subject *
                </label>
                <select
                  id="subject"
                  required
                  className="w-full p-4 bg-white border-2 border-stone-200 rounded-lg text-charcoal-800 transition-all focus:outline-none focus:border-dustyBlue-400 focus:ring-2 focus:ring-dustyBlue-100"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Select a subject</option>
                  <option value="project">Development project</option>
                  <option value="consulting">Technical consulting</option>
                  <option value="job">Job opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-stone-700">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full p-4 bg-white border-2 border-stone-200 rounded-lg text-charcoal-800 transition-all focus:outline-none focus:border-dustyBlue-400 focus:ring-2 focus:ring-dustyBlue-100 placeholder:text-stone-300 resize-none"
                placeholder="Tell me about your project..."
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
                    Sending...
                  </span>
                ) : (
                  'Send message'
                )}
              </button>
            </div>
            {status === 'success' && (
              <div className="text-center text-sage-700 bg-sage-100 p-4 rounded-lg border border-sage-300">
                ✓ Message sent successfully!
              </div>
            )}

            {status === 'error' && (
              <div className="text-center text-terracotta-700 bg-terracotta-100 p-4 rounded-lg border border-terracotta-300">
                ✗ An error occurred. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
