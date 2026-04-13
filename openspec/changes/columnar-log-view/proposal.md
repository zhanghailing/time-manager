## Why

The current list-based view of logged records is difficult to scan and analyze at a glance. Users need to see their completion history by date to quickly identify gaps, patterns, and progress. A columnar layout grouped by date with category summaries makes it easier to spot trends and understand when items were completed throughout each day.

## What Changes

- Replace the sequential list view with a columnar layout where each date is a column
- Within each date column, group records by category (toilet, water, break)
- Show count summary for each category per date (e.g., "toilet 10:01, 11:20 (2 total)")
- Pin the 3 add buttons (+toilet, +water, +break) to a fixed right sidebar
- Keep the scrollable log history on the left, with date columns scrolling horizontally

## Capabilities

### New Capabilities
- `columnar-log-display`: Display logged records in columns grouped by date, with category grouping and count summaries within each date. The add buttons remain fixed on the right side while the log history scrolls independently.

### Modified Capabilities
<!-- No existing requirement changes needed -->

## Impact

- UI/Layout: Changes the primary view from a vertical list to a columnar grid layout
- Components: New components for date columns, category groups, and button sidebar
- No API or data structure changes - the same persisted log data is displayed differently
- CSS: Significant layout changes (grid/flexbox reorganization)
