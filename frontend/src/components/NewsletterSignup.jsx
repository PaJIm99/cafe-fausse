import React, { useState } from 'react';
import { subscribeNewsletter } from '../api/client';
import '../styles/global.css';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    // Basic email validation
    const isValidEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!isValidEmail) {
      setStatus('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await subscribeNewsletter({ email, name });

      if (result.ok) {
        setShowModal(true);
        setStatus('');
        setEmail('');
        setName('');
      } else {
        setStatus(result.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-ash rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-2">Join Our Newsletter</h2>
      <p className="text-center text-[var(--muted)] mb-6">Stay updated with the latest news, events, and offers from Café Fausse</p>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="label">Email *</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="button w-full py-3 flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2" />
                Subscribing...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane mr-2" />
                Subscribe
              </>
            )}
          </button>

          {status && (
            <div className="status-message mt-4 border-l-4 border-[var(--gold)] text-[var(--gold)] bg-gray-100 p-3 rounded">
              {status}
            </div>
          )}
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="modal-content bg-gold p-8 rounded-xl max-w-md text-center shadow-xl">
            <div className="email-animation text-[var(--accent)] text-4xl mb-4">
              <i className="fas fa-paper-plane"></i>
            </div>
            <h2 className="text-xl font-bold text-[var(--primary)] mb-2">Confirmation Email Sent!</h2>
            <p className="text-gold-700 mb-6">We've sent a confirmation email to <span className="font-medium">{email}</span>. Please check your inbox.</p>
            <button
              className="button"
              onClick={() => setShowModal(false)}
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
