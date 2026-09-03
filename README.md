# SmartChu

Mobile foundation for the owner experience. This repository contains the Expo React Native client only; no backend runtime or property/booking business implementation belongs here.

## Start

1. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_OWNER_API_BASE_URL` to the deployed `smart-platform-services` base URL.
2. Run `npm install`.
3. Run `npm start` (or `npm run android`, `npm run ios`, or `npm run web`).

The app restores a secure persisted session and displays either the login/register shell or the authenticated owner shell. An unset API base URL is intentionally rendered as a configuration error rather than guessed.

## API boundary

`src/api/ownerApi.ts` is the single HTTP boundary for owner endpoints. It currently expects:

- `POST /owner/auth/login`
- `POST /owner/auth/register`

Both endpoints return `{ accessToken, ownerId }`. GLI-16 and GLI-15 should update this adapter when their service contract is finalized; screens and session storage do not call `fetch` directly.

## Quality checks

Run `npm run typecheck`, `npm run lint`, and `npm test`. The unit suite covers configuration and form-validation baselines.
