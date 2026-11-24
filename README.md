# AssetSync Frontend

React + Vite + Material UI frontend for the AssetSync university resource management demo.

## Requirements

- Node.js 20+
- npm
- AssetSync Spring Boot backend running on port 8085 by default

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to your backend API URL. The current committed lockfile needs a refresh; `npm install` resolves and updates it locally.

3. Start the frontend:

   ```bash
   npm run dev
   ```

4. Build and lint:

   ```bash
   npm run lint
   npm run build
   ```

## Demo access note

The Lecturer and Student choices are demonstration roles stored in browser local storage. They are not real authentication and must not be treated as a security boundary. The backend currently has no authentication or role-based authorization. Do not expose the backend's write endpoints to untrusted networks until server-side authentication and authorization are implemented.

The batch allocation UI is hidden/disabled for the Student demo role for a cleaner demonstration experience only; this does not secure the API.

## Alternative room selection

When a room request conflicts, selecting a suggested room now submits a new request with the selected preferred room ID. The backend validates that room and uses it during allocation rather than showing a success message without creating a request.
