import { useState, useEffect } from 'react';
import { getJobList } from '../api/client';
import type { Job } from '../interfaces/Job.interface';
import type { UseJobListResult } from './../interfaces/UseJobListResult.interface';

export function useJobList(): UseJobListResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchJobs() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getJobList();
        if (!cancelled) setJobs(data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Failed to load jobs');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchJobs();
    return () => {
      cancelled = true;
    };
  }, []);

  return { jobs, isLoading, error };
}
