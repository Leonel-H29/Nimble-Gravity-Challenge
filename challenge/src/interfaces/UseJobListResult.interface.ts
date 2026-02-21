import type { Job } from './Job.interface';

export interface UseJobListResult {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
}
