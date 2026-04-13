## Context

Greenfield web app targeting a single user (the developer themselves) with ADHD. The goal is friction reduction: the app must be instantly usable with zero configuration, visually calming, and reward-focused. No backend, no auth, no onboarding. The entire interaction is a repeating checklist.

## Goals / Non-Goals

**Goals:**
- Single-page app that loads instantly in a browser
- Three checklist item types: toilet, water, break
- Checking an item records a timestamp and appends a new unchecked copy of the same type below
- Checked items display their timestamp inline (e.g., `[✓] toilet 10:01`)
- Unchecked items are visually prominent and easy to tap/click
- State survives page refresh (localStorage)

**Non-Goals:**
- Multi-user or cloud sync
- Streaks, analytics, or charts (v1)
- Push notifications or reminders
- Mobile app (browser-only for now)
- Configurable item types (hardcoded to toilet, water, break for v1)

## Decisions

### React + TypeScript + Vite
**Decision:** Implement as a Vite-scaffolded React + TypeScript SPA.  
**Rationale:** TypeScript gives type safety for the item data model (no accidental undefined timestamps). React's component model makes the self-replenishing list easy to reason about — state change triggers a re-render automatically, no manual DOM diffing. Vite provides a fast dev server and a production build with minimal config.  
**Alternative considered:** Plain HTML/CSS/JS — rejected in favour of TypeScript + React for better maintainability and type safety as the app grows.

### localStorage for persistence
**Decision:** Store the checklist state in `localStorage` as a JSON array.  
**Rationale:** Survives page refresh, requires no backend, works offline, trivial to implement.  
**Alternative considered:** In-memory only — rejected because refreshing would wipe completed history.

### Self-replenishing list (always one unchecked per type visible at the bottom)
**Decision:** After checking any item, immediately append a new unchecked item of the same type at the bottom of the list.  
**Rationale:** Matches the user's described mental model exactly. The list always shows "what's next" without the user having to think about it.  
**Alternative considered:** Fixed list with reset — rejected because it forces the user to actively decide to "reset", adding cognitive load.

### Checked items stay visible in history
**Decision:** Completed items remain in the list above the new unchecked copy, showing their timestamp.  
**Rationale:** Provides a visible reward log — seeing past completions is motivating for ADHD brains.

## Risks / Trade-offs

- **localStorage can be cleared by the browser** → Mitigation: acceptable for v1; data is motivational, not critical.
- **No notifications** → User still relies on their own awareness to check the app; this is intentional for v1 to keep scope small.
- **Requires Node.js / npm** → Mitigation: one-time `npm install`; dev server starts with `npm run dev`. Acceptable trade-off for type safety.
- **Build step needed for production** → `npm run build` outputs to `dist/`; can be opened directly or served statically.
