import type { Candidate } from '../../interfaces/Candidate.interface';
import type { Job } from '../../interfaces/Job.interface';

export interface JobCardProps {
  job: Job;
  candidate: Candidate;
  index: number;
}
