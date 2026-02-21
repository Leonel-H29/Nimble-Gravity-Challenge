import { useJobList } from '../hooks/useJobList.hook';
import { JobCard } from './JobCard.component';
import type { JobListProps } from './interfaces/JobListProps.interface';

export function JobList({ candidate }: JobListProps) {
  const { jobs, isLoading, error } = useJobList();

  return (
    <div className="job-list-section">
      <div className="section-header">
        <span className="lookup-tag">STEP 02</span>
        <h2>Open positions</h2>
        <p>
          Welcome,{' '}
          <strong>
            {candidate.firstName} {candidate.lastName}
          </strong>
          . Select a position and submit your repository URL.
        </p>
      </div>

      {isLoading && (
        <div className="loading-state">
          <span className="spinner spinner--lg" />
          <p>Loading positions…</p>
        </div>
      )}

      {error && (
        <div className="error-banner">
          <p>⚠ Failed to load positions: {error}</p>
        </div>
      )}

      {!isLoading && !error && jobs.length === 0 && (
        <div className="empty-state">
          <p>No open positions at this time.</p>
        </div>
      )}

      {!isLoading && jobs.length > 0 && (
        <div className="job-grid">
          {jobs.map((job, i) => (
            <JobCard key={job.id} job={job} candidate={candidate} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
