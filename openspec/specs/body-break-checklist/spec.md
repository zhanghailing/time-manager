# body-break-checklist Specification

## Purpose
TBD - created by archiving change adhd-body-break-rewards. Update Purpose after archive.
## Requirements
### Requirement: Display checklist of body-break items
The app SHALL display a checklist containing body-break items of three types: toilet, water, and break. On initial load, one unchecked item of each type SHALL be shown.

#### Scenario: Initial load shows one item per type
- **WHEN** the user opens the app for the first time
- **THEN** the checklist SHALL display exactly one unchecked toilet item, one unchecked water item, and one unchecked break item

#### Scenario: Persisted state is restored on reload
- **WHEN** the user reloads the page
- **THEN** the checklist SHALL restore the full history of checked items and all unchecked items from localStorage

### Requirement: Check off a body-break item
The app SHALL allow the user to mark any unchecked item as completed by clicking or tapping it. Upon completion, the item SHALL display a timestamp (HH:MM) and become visually distinct from unchecked items.

#### Scenario: Checking an unchecked item records the time
- **WHEN** the user clicks an unchecked item
- **THEN** the item SHALL change to a checked state and display the current time in HH:MM format inline

#### Scenario: Checked item cannot be unchecked
- **WHEN** the user clicks a checked item
- **THEN** nothing SHALL happen (checked items are immutable)

### Requirement: Self-replenishing list
After an item is checked, the app SHALL immediately append a new unchecked item of the same type at the bottom of the checklist.

#### Scenario: New unchecked item appears after check
- **WHEN** the user checks a toilet item
- **THEN** a new unchecked toilet item SHALL appear at the bottom of the list

#### Scenario: Multiple completions of same type accumulate
- **WHEN** the user checks toilet at 10:01 and again at 11:00
- **THEN** the list SHALL show `[✓] toilet 10:01`, `[✓] toilet 11:00`, and a new unchecked toilet item

### Requirement: Persist state across page reloads
The app SHALL save checklist state to localStorage after every change so that history survives a browser refresh.

#### Scenario: State is saved on check
- **WHEN** the user checks an item
- **THEN** the updated checklist state SHALL be written to localStorage immediately

#### Scenario: State is loaded on startup
- **WHEN** the app initializes and localStorage contains saved state
- **THEN** the checklist SHALL be populated from that saved state instead of the default initial state

