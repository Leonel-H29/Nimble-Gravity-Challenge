import type { Candidate } from '../../interfaces/Candidate.interface';

export interface CandidateLookupProps {
  onFound: (candidate: Candidate) => void;
}
