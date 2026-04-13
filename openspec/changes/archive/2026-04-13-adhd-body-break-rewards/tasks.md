## 1. Project Setup

- [x] 1.1 Scaffold project with `npm create vite@latest . -- --template react-ts` at the project root
- [x] 1.2 Run `npm install` to install dependencies
- [x] 1.3 Remove Vite boilerplate (default `App.tsx` content, `App.css`, `index.css` placeholder styles)

## 2. Data Model

- [x] 2.1 Define `BreakItem` TypeScript type in `src/types.ts`: `{ id: string; type: 'toilet' | 'water' | 'break'; checked: boolean; timestamp: string | null }`
- [x] 2.2 Implement `loadState()` in `src/storage.ts` — reads `BreakItem[]` from localStorage, or returns default (one item per type)
- [x] 2.3 Implement `saveState(items: BreakItem[])` in `src/storage.ts` — writes array to localStorage as JSON

## 3. Core Checklist Logic

- [x] 3.1 Implement `checkItem` logic in `App.tsx` — marks item checked with current HH:MM timestamp, then appends a new unchecked item of the same type
- [x] 3.2 Guard against clicking already-checked items (noop if `item.checked`)
- [x] 3.3 Call `saveState` after every state update

## 4. Components

- [x] 4.1 Create `src/components/ChecklistItem.tsx` — renders a single item (checked or unchecked)
- [x] 4.2 Checked variant: show checkmark, item label with emoji, timestamp; muted style, not clickable
- [x] 4.3 Unchecked variant: large tappable button with emoji + label (🚽 Toilet, 💧 Water, ☕ Break)
- [x] 4.4 Wire `onClick` on unchecked items to call the `checkItem` handler from `App.tsx`

## 5. App Shell

- [x] 5.1 In `App.tsx`, initialise state with `useState(() => loadState())` so it hydrates from localStorage on first render
- [x] 5.2 Render the list of `ChecklistItem` components from state
- [x] 5.3 Verify page reload restores full history correctly in the browser

## 6. Styling

- [x] 6.1 Add global styles in `src/index.css`: calm warm-white background, full-height layout, system font stack
- [x] 6.2 Style unchecked items: large font, full-width, soft background color, rounded corners, generous padding
- [x] 6.3 Style checked items: smaller, muted color, timestamp shown inline, no hover effect
- [x] 6.4 Ensure layout works on both desktop and mobile screen widths (max-width container, responsive padding)
