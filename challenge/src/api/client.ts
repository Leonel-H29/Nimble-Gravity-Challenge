import type { Candidate } from '../interfaces/Candidate.interface';
import type { Job } from '../interfaces/Job.interface';
import type { ApplyPayload } from '../interfaces/ApplyPayload.interface';
import type { ApplyResponse } from '../interfaces/ApplyResponse.interface';

const BASE_URL = import.meta.env.VITE_BASE_URL || '';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const body = await response.json();
      message = body.message ?? body.error ?? JSON.stringify(body);
    } catch {
      // If JSON parse fails, use a default error message
      message = 'An unexpected error occurred.';
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export async function getCandidateByEmail(email: string): Promise<Candidate> {
  const url = `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(
    email
  )}`;
  const response = await fetch(url);
  return handleResponse<Candidate>(response);
}

export async function getJobList(): Promise<Job[]> {
  const url = `${BASE_URL}/api/jobs/get-list`;
  const response = await fetch(url);
  return handleResponse<Job[]>(response);
}

export async function applyToJob(
  payload: ApplyPayload
): Promise<ApplyResponse> {
  const url = `${BASE_URL}/api/candidate/apply-to-job`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<ApplyResponse>(response);
}
