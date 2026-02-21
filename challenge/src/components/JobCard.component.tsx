import { useState, type ChangeEvent } from 'react';
import { useApply } from '../hooks/useApply.hook';
import type { JobCardProps } from './interfaces/JobCardProps.interface';

export function JobCard({ job, candidate, index }: JobCardProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const { status, error, submit, reset } = useApply();

  function handleUrlChange(e: ChangeEvent<HTMLInputElement>) {
    setRepoUrl(e.target.value);
    if (status === 'error') reset();
  }

  async function handleSubmit() {
    if (!repoUrl.trim()) return;
    await submit({
      uuid: candidate.uuid,
      jobId: job.id,
      candidateId: candidate.candidateId,
      applicationId: candidate.applicationId,
      repoUrl: repoUrl.trim(),
    });
  }

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isValid = repoUrl.trim().length > 0;

  return (
    <div
      className={`job-card ${isSuccess ? 'job-card--success' : ''}`}
      style={{ '--i': index } as React.CSSProperties}
    >
      <div className="job-card-index">{String(index + 1).padStart(2, '0')}</div>
      <div className="job-card-content">
        <h3 className="job-title">{job.title}</h3>
        <span className="job-id">ID: {job.id}</span>

        {isSuccess ? (
          <div className="success-state">
            <span className="success-icon">✓</span>
            <p>Application submitted successfully!</p>
          </div>
        ) : (
          <div className="job-apply">
            <div className="input-row">
              <input
                type="url"
                value={repoUrl}
                onChange={handleUrlChange}
                placeholder="https://github.com/your-user/your-repo"
                disabled={isLoading}
                className={error ? 'input-error' : ''}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading || !isValid}
                className="btn-submit"
              >
                {isLoading ? (
                  <span className="spinner spinner--sm" />
                ) : (
                  'Submit'
                )}
              </button>
            </div>
            {error && <p className="error-msg">⚠ {error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
