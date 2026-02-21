import { useState, useCallback } from 'react';
import { applyToJob } from '../api/client';
import type { ApplyPayload } from '../interfaces/ApplyPayload.interface';
import type { SubmissionStatus } from '../types/SubmissionStatus.type';
import type { UseApplyResult } from '../interfaces/UseApplyResult.interface';

export function useApply(): UseApplyResult {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (payload: ApplyPayload) => {
    setStatus('loading');
    setError(null);
    try {
      await applyToJob(payload);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return { status, error, submit, reset };
}
