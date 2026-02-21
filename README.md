# Job Challenge — Candidate Application Portal

A single-page application built with **React + TypeScript + Vite** that allows candidates to look up their profile and submit applications to open positions through a REST API.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
  - [Step 1 — Identify Yourself](#step-1--identify-yourself)
  - [Step 2 — Browse Open Positions](#step-2--browse-open-positions)
  - [Step 3 — Submit Your Application](#step-3--submit-your-application)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)

---

## Overview

This project is a minimal career portal built as a technical challenge. It connects to a remote API to:

1. Retrieve candidate data by email
2. List all available job openings
3. Allow the candidate to submit their GitHub repository URL as part of a job application

The entire UI is built with custom CSS — no component library or UI framework dependencies.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI rendering |
| TypeScript | Static typing throughout |
| Vite | Dev server and bundler |
| Custom CSS | Styling — zero external UI dependencies |

---

## Project Structure

```
# src/

├── api/
│   └── client.ts 				# All API calls with centralized error handling
├── assets/
│   └── react.svg
├── components/
│   ├── interfaces/
│   │   ├── CandidateLookupProps.interface.ts
│   │   ├── JobCardProps.interface.ts
│   │   └── JobListProps.interface.ts
│   ├── CandidateLookup.component.tsx		# Email lookup form (Step 1)
│   ├── JobCard.component.tsx			# Individual job with repo URL input and Submit button
│   └── JobList.component.tsx			# Renders the full list of job cards (Step 2)
├── hooks/
│   ├── useApply.hook.ts			# Manages per-job submission state
│   └── useJobList.hook.ts			# Fetches and manages job list state
├── interfaces/ 				# Shared TypeScript interfaces
│   ├── ApplyPayload.interface.ts
│   ├── ApplyResponse.interface.ts
│   ├── Candidate.interface.ts
│   ├── Job.interface.ts
│   ├── UseApplyResult.interface.ts
│   └── UseJobListResult.interface.ts
├── styles/
│   └── global.css				# All styles, CSS variables and animations
├── types/ 					# Shared TypeScript type
│   └── SubmissionStatus.type.ts
├── App.tsx					# Root component, manages candidate state
├── index.css
└── main.tsx
```

---

## Getting Started

**Requirements:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
http://localhost:5173
```

To create a production build:

```bash
npm run build
```

---

## How It Works

### Step 1 — Identify Yourself

When the app loads, the candidate is prompted to enter the email address associated with their application.

<img width="1857" height="1000" alt="Screenshot from 2026-02-21 17-28-41" src="https://github.com/user-attachments/assets/b7a7bf2a-fabc-4b61-9413-4593bbb26eb7" />

The app calls `GET /api/candidate/get-by-email?email=...` and retrieves the candidate's profile including their `uuid`, `candidateId`, and `applicationId`. These values are held in React state and passed down to the job application components.

If the email is not found or the request fails, an inline error message is displayed below the input.

---

### Step 2 — Browse Open Positions

Once the candidate is identified, the view transitions to the open positions list. The app simultaneously calls `GET /api/jobs/get-list` to fetch all available roles.

<img width="1857" height="1000" alt="Screenshot from 2026-02-21 17-29-17" src="https://github.com/user-attachments/assets/376e390a-d333-4d59-ac82-c3a25ddd7aad" />

Each position card shows:
- The job title
- The job ID
- A URL input field for the GitHub repository
- A **Submit** button

Each card manages its own independent loading and error state via the `useApply` hook, so submitting to one position does not affect the others.

---

### Step 3 — Submit Your Application

After entering a GitHub repository URL and clicking **Submit**, the app sends a `POST /api/candidate/apply-to-job` request with the candidate's full profile data and the selected job ID.

<img width="735" height="376" alt="Screenshot from 2026-02-21 17-30-05" src="https://github.com/user-attachments/assets/bea8904c-9488-4eff-aa3f-84b192d1bea7" />

On success, the card transitions to a confirmation state showing a green checkmark and the message *"Application submitted successfully!"*. The input and button are replaced, preventing duplicate submissions.

---

## API Reference

All requests are made to:

```.env
VITE_BASE_URL=...
```
**Use in src/api/client.ts**

The variable is not “imported” in the usual sense; it’s read from Vite’s env object:

```
const BASE_URL = import.meta.env.VITE_BASE_URL || '';
```


### `GET /api/candidate/get-by-email`

Retrieves a candidate's profile by email.

| Parameter | Type | Description |
|---|---|---|
| `email` | query string | The candidate's email address |

**Response `200`:**
```json
{
  "uuid": "...",
  "candidateId": "...",
  "applicationId": "...",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com"
}
```

---

### `GET /api/jobs/get-list`

Returns the list of all open positions.

**Response `200`:**
```json
[
  { "id": "4416372005", "title": "Fullstack developer" },
  { "id": "9100000001", "title": "Head Chef" }
]
```

---

### `POST /api/candidate/apply-to-job`

Submits a candidate's application for a specific position.

**Request body:**
```json
{
  "uuid": "candidate uuid",
  "jobId": "position id",
  "candidateId": "candidate id",
  "applicationId": "application id",
  "repoUrl": "https://github.com/your-user/your-repo"
}
```

**Response `200`:**
```json
{ "ok": true }
```

---

## Error Handling

The API returns descriptive error messages in the response body. The `handleResponse` utility in `api/client.ts` reads the error body before throwing, so API messages surface directly in the UI rather than showing a generic failure message.

Errors are displayed:
- **Inline below the email input** during candidate lookup
- **Inline below each repo URL input** during job submission, scoped per card
- **As a banner** if the job list itself fails to load
