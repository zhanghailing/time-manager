## Why

People with ADHD often resist breaking out of hyperfocus for basic body needs (toilet, water, breaks) because the transition feels costly and anxiety-inducing. This app reduces that friction by making compliance feel rewarding and low-stakes — a simple, visual checklist that acknowledges each healthy act in real time.

## What Changes

- Introduce a new web app (greenfield) with a repeating checklist UI for body-break activities
- Each checklist item (toilet, water, break) can be checked off with a timestamp
- Checking an item immediately spawns a new unchecked copy below it, so the list always shows what's next
- No login, no setup — opens and works immediately in a browser

## Capabilities

### New Capabilities

- `body-break-checklist`: A live, self-replenishing checklist of body-break activities (toilet, water, break). Each check records a timestamp and adds a new unchecked item of the same type beneath it.

### Modified Capabilities

*(none — this is a greenfield app)*

## Impact

- New standalone web app (HTML/CSS/JS or lightweight framework)
- No backend required for v1 — state held in memory or localStorage
- No external dependencies required beyond a browser
