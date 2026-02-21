import { useState, type FormEvent } from 'react';
import { getCandidateByEmail } from '../api/client';
import type { CandidateLookupProps } from './interfaces/CandidateLookupProps.interface';

export function CandidateLookup({ onFound }: CandidateLookupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const candidate = await getCandidateByEmail(email.trim());
      onFound(candidate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not find candidate');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="lookup-card">
      <div className="lookup-header">
        <span className="lookup-tag">STEP 01</span>
        <h2>Identify yourself</h2>
        <p>
          Enter the email address associated with your application to get
          started.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="lookup-form">
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="btn-primary"
          >
            {isLoading ? <span className="spinner" /> : 'Lookup →'}
          </button>
        </div>
        {error && <p className="error-msg">⚠ {error}</p>}
      </form>
    </div>
  );
}
