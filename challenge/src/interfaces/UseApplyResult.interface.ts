import type { SubmissionStatus } from '../types/SubmissionStatus.type';
import type { ApplyPayload } from './ApplyPayload.interface';

export interface UseApplyResult {
  status: SubmissionStatus;
  error: string | null;
  submit: (payload: ApplyPayload) => Promise<void>;
  reset: () => void;
}
