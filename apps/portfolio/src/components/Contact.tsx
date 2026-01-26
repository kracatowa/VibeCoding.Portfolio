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
    <section id="contact" className="py-6 px-6 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light mb-4" style={{fontFamily: 'Georgia, serif'}}>
            <span className="text-dustyBlue-600 font-semibold">Contact</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16 ">
          <a
            href="mailto:ocean.barras@hotmail.com"
            className="bg-white/40 backdrop-blur-sm p-6 rounded-md text-center group hover:bg-white/60 transition-all border border-stone-200/60"
          >
            <div className="text-terracotta-500 mb-3 flex justify-center ">
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
            </div>
            <h3 className="font-medium mb-2 text-stone-800 text-sm">Email</h3>
            <p className="text-stone-600 text-xs">
              ocean.barras@hotmail.com
            </p>
          </a>

          <a
            href="tel:418-520-5929"
            className="bg-white/40 backdrop-blur-sm p-6 rounded-md text-center group hover:bg-white/60 transition-all border border-stone-200/60"
          >
            <div className="text-dustyBlue-500 mb-3 flex justify-center">
              <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
            </div>
            <h3 className="font-medium mb-2 text-stone-800 text-sm">Phone</h3>
            <p className="text-stone-600 text-xs">
              418-520-5929
            </p>
          </a>

          <a
            href="https://linkedin.com/in/ocean-barras"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/40 backdrop-blur-sm p-6 rounded-md text-center group hover:bg-white/60 transition-all border border-stone-200/60"
          >
            <div className="text-sage-500 mb-3 flex justify-center">
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </div>
            <h3 className="font-medium mb-2 text-stone-800 text-sm">LinkedIn</h3>
            <p className="text-stone-600 text-xs">
              linkedin.com/in/ocean-barras
            </p>
          </a>
        </div>
        
        <div className="bg-white/40 backdrop-blur-sm p-8 rounded-md">
          <h3 className="text-2xl font-light mb-6 text-center text-stone-800" style={{fontFamily: 'Georgia, serif'}}>Send a message</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-2 text-stone-600">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full p-3 bg-white/60 border border-stone-200 rounded-md text-stone-800 text-sm transition-all focus:outline-none focus:border-dustyBlue-400 focus:bg-white placeholder:text-stone-400"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-2 text-stone-600">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-3 bg-white/60 border border-stone-200 rounded-md text-stone-800 text-sm transition-all focus:outline-none focus:border-dustyBlue-400 focus:bg-white placeholder:text-stone-400"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-xs font-medium mb-2 text-stone-600">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full p-3 bg-white/60 border border-stone-200 rounded-md text-stone-800 text-sm transition-all focus:outline-none focus:border-dustyBlue-400 focus:bg-white placeholder:text-stone-400"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-medium mb-2 text-stone-600">
                  Subject *
                </label>
                <select
                  id="subject"
                  required
                  className="w-full p-3 bg-white/60 border border-stone-200 rounded-md text-stone-800 text-sm transition-all focus:outline-none focus:border-dustyBlue-400 focus:bg-white"
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
              <label htmlFor="message" className="block text-xs font-medium mb-2 text-stone-600">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full p-3 bg-white/60 border border-stone-200 rounded-md text-stone-800 text-sm transition-all focus:outline-none focus:border-dustyBlue-400 focus:bg-white placeholder:text-stone-400 resize-none"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center px-6 py-3 rounded-md text-sm font-medium bg-white/40 text-dustyBlue-700 hover:bg-white/60 transform transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faSpinner} spin className="h-4 w-4" />
                    Sending...
                  </span>
                ) : (
                  'Send message'
                )}
              </button>
            </div>
            {status === 'success' && (
              <div className="text-center text-sage-700 bg-sage-100/60 p-3 rounded-md text-sm">
                ✓ Message sent successfully!
              </div>
            )}

            {status === 'error' && (
              <div className="text-center text-terracotta-700 bg-terracotta-100/60 p-3 rounded-md text-sm">
                ✗ An error occurred. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
