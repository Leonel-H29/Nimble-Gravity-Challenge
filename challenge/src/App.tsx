import { useState } from 'react';
import type { Candidate } from './interfaces/Candidate.interface';
import { CandidateLookup } from './components/CandidateLookup.component';
import { JobList } from './components/JobList.component';
import './styles/global.css';

export default function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="header-logo">
              <span className="logo-mark">◈</span>
              <span className="logo-text">Careers</span>
            </div>
            <span
              style={{
                display: 'inline-block',
                height: '28px',
                width: '1px',
                background: 'var(--border-hi, #353a47)',
                margin: '0 16px',
                opacity: 0.4,
              }}
              aria-hidden="true"
            />
            <div className="header-tagline">Apply to open positions</div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {!candidate ? (
            <CandidateLookup onFound={setCandidate} />
          ) : (
            <JobList candidate={candidate} />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} — All positions are verified and active
          </p>
        </div>
      </footer>
    </div>
  );
}
