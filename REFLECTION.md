# Reflection

## How long it took
Overall, this took me about 4 hours to complete.

The core functionality was done in roughly 2-3 hours, and the remaining time went into refining the UI, fixing edge cases, and putting together this write-up.

## What was easy

- **Expo setup** — the `create-expo-app` CLI and `expo-router` made scaffolding fast. File-based routing meant I didn't have to wire up navigation config manually.
- **Mock data modeling** — defining the campaign/submission types and seeding realistic data was straightforward. Having clear types from the start made the rest of the build smoother.
- **Component composition** — React Native's component model made it natural to break the UI into `CampaignCard`, `StatusBadge`, and screen-level components without over-abstracting.

## What was hard

- **Peer dependency conflicts** — Expo 54 + React 19 introduced some npm peer dep mismatches that required `--legacy-peer-deps`. Minor but annoying.
- **Smart quote encoding** — a unicode curly apostrophe in campaign data broke the Metro bundler. Subtle issue that only showed up at compile time.
- **Scoping decisions** — deciding where to draw the line on features (animations, pull-to-refresh, search/filter, real backend) within the timebox required discipline.

## My process

1. Read the brief and identified the four core user flows
2. Chose the stack: Expo + expo-router (file-based routing) + TypeScript
3. Defined the data layer first (types, mock campaigns, in-memory store)
4. Built screens top-down: campaigns list → campaign detail → submission form → submissions list
5. Used Claude Code to accelerate scaffolding and catch compilation issues early
6. Verified the build compiles successfully before submitting

## What I'd do differently with more time

- **Animations** — screen transitions, card press effects, skeleton loading states
- **Search & filter** — filter campaigns by tag, sort by payout or deadline
- **Pull-to-refresh** — simulate fetching new campaigns
- **Image/video previews** — inline video thumbnails with play overlay instead of opening external links
- **Persistent storage** — AsyncStorage or SQLite so submissions survive app restart
- **Real backend** — API integration with proper auth, pagination, and webhooks for status updates
- **Testing** — unit tests for the store, component snapshot tests
- **Accessibility** — proper `accessibilityLabel` and `accessibilityRole` on interactive elements
