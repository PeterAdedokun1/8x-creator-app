# 8x Creator App

An Expo + React Native demo app for creators to browse brand campaigns, review campaign briefs, submit content links, and track submission status.

## Overview

This project simulates a lightweight creator marketplace workflow:

- Browse active UGC campaigns
- Open a campaign to view the brief, payout, deadline, and example videos
- Submit a TikTok or Instagram video URL for review
- Track pending, approved, and rejected submissions in a dedicated screen

The app uses seeded mock data and a small in-memory store, so it works as a self-contained product demo without a backend.

## Features

- Expo Router file-based navigation
- Campaign list with payout, tags, and deadline urgency
- Campaign detail screen with:
  - campaign brief
  - example video references
  - existing submissions for that campaign
  - inline submission form
- Submission tracking screen with status summary cards
- Simple pub/sub in-memory store for live UI updates after submission
- TypeScript types for campaigns, videos, and submissions

## Tech Stack

- Expo
- React Native
- Expo Router
- TypeScript
- React 19

## Project Structure

```text
app/
  _layout.tsx           Tab layout and routing
  index.tsx             Campaign list screen
  submissions.tsx       Submission tracking screen
  campaign/[id].tsx     Campaign detail + submit flow

src/
  components/
    CampaignCard.tsx
    StatusBadge.tsx
  constants/
    theme.ts
  data/
    campaigns.ts        Seeded campaign data
    store.ts            In-memory submissions store
    types.ts            Shared TypeScript models
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Expo-compatible simulator, emulator, or mobile device with Expo Go

### Install

```bash
npm install
```

### Run the app

```bash
npm start
```

Then choose a target:

- `a` for Android
- `i` for iOS
- `w` for web

You can also run the platform scripts directly:

```bash
npm run android
npm run ios
npm run web
```

## How It Works

### Campaigns

The home screen reads from `src/data/campaigns.ts` and renders a list of seeded opportunities for creators.

### Submissions

Submissions are stored in `src/data/store.ts`. When a creator submits a valid TikTok or Instagram URL:

1. A new submission is added with `pending` status
2. Store listeners are notified
3. The submissions screen updates immediately

Because this store is in-memory only, submitted data resets when the app reloads.

## Validation Rules

The current submission form accepts links that include:

- `tiktok.com`
- `instagram.com`

Anything else is rejected with a simple alert.

## Limitations

- No persistent storage
- No real authentication or backend
- No API integration
- No automated tests yet
- Example thumbnails are mock image URLs

## Notes

- Build artifacts are output to `dist/`
- Local Expo machine-specific files live in `.expo/` and should not be committed
- Additional project notes are available in `REFLECTION.md` and `ai-logs/claude-code-session.md`
