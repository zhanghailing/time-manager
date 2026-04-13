## Context

The app currently displays all logged body-break items in a single scrollable list. Users can check off items (toilet, water, break) and see their timestamped completion history. The data is persisted in localStorage with a flat array of checked items. 

The new feature reorganizes this same data into a columnar view grouped by date to improve visual analysis of daily patterns and completion trends.

## Goals / Non-Goals

**Goals:**
- Display logged records in date-based columns instead of a single list
- Group records by category within each date column
- Show category count summaries (e.g., "toilet (3)") for each date
- Fix the 3 add buttons in a right sidebar while logs scroll horizontally
- Maintain all existing checklist functionality (check items, auto-replenish, persistence)

**Non-Goals:**
- Change the underlying data model or storage
- Add filtering, sorting, or date range selection UI
- Modify the persistence layer
- Add new item types beyond toilet/water/break

## Decisions

**1. Layout Architecture: Fixed Sidebar + Scrollable Content**
- Right sidebar with fixed position containing the 3 add buttons
- Main content area with horizontal scroll for date columns
- **Rationale**: Buttons must always be accessible without scrolling; date columns naturally scroll horizontally as data grows
- **Alternative considered**: Floating button group (less clean, harder to position reliably)

**2. Grid Structure: CSS Grid for Date Columns**
- Use CSS Grid with date strings as column templates
- Each column represents one date
- Within each date column, use flexbox for vertical category groups
- **Rationale**: Grid handles responsive column sizing well; flexbox works for vertical stacking within columns
- **Alternative considered**: Nested flex containers (less semantic, harder to align columns)

**3. Data Transformation: Client-side Grouping in React**
- Transform logged items in a useMemo hook: group by date, then by category
- Create in-memory structure: `{ date: [{ category, count, items }, ...] }`
- **Rationale**: Simple, fast for typical dataset sizes; no backend changes needed
- **Alternative considered**: Group on-the-fly in render (less efficient if data is large)

**4. Timestamp Display: Time with Category Header**
- Group header shows category name (e.g., "toilet") and total count: `toilet (3)`
- Items below show only time: `10:01`, `11:23`, `14:05`
- **Rationale**: Count immediately visible without counting; compact time-only format
- **Alternative considered**: Show full timestamp per item (more verbose, harder to scan counts)

**5. Date Column Order: Right-to-Left (Most Recent Right)**
- Newest dates appear on the right side of the scroll
- Oldest dates on the left
- **Rationale**: Natural scrolling behavior (users scroll right to see newer data); places today's column closest to the buttons
- **Alternative considered**: Left-to-right (less intuitive for time-based data)

## Risks / Trade-offs

**[Risk] Responsive design on small screens**
- Columns may become very narrow on mobile, reducing readability
- **Mitigation**: Stack columns vertically on mobile via media query; use horizontal scroll on tablets/desktop

**[Risk] Performance with many months of data**
- Large number of DOM nodes could slow down rendering
- **Mitigation**: Implement virtual scrolling or lazy loading if needed; start with horizontal scroll and optimize if users report lag

**[Risk] Ambiguous date boundaries near midnight**
- If items are checked after midnight, grouping is clear; but visual alignment might be confusing
- **Mitigation**: Make date headers (e.g., "2026-04-14") very clear and prominent

**[Risk] Sidebar width reduces space for log columns**
- Content area is narrower due to fixed sidebar
- **Mitigation**: Make sidebar width reasonable (~100-120px); use ellipsis or abbreviations for button labels if needed
