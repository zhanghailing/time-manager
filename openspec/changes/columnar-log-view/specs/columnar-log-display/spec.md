# columnar-log-display Specification

## Purpose
Enable users to view their body-break completion history in a columnar layout grouped by date, making it easier to identify daily patterns and completion trends at a glance.

## ADDED Requirements

### Requirement: Display logs in date-based columns
The app SHALL arrange all logged body-break items in vertical columns, where each column represents a single date. Columns SHALL be ordered chronologically from oldest (left) to newest (right).

#### Scenario: Multiple dates with items display in date columns
- **WHEN** the user has logged items across multiple dates (2026-04-12, 2026-04-13, 2026-04-14)
- **THEN** the app SHALL display three visible columns labeled with their respective dates, ordered left to right chronologically

#### Scenario: Single date with multiple items fills one column
- **WHEN** the user has logged 5 items on 2026-04-14
- **THEN** all 5 items SHALL appear in the 2026-04-14 column, stacked vertically

### Requirement: Group items by category within each date column
Within each date column, items SHALL be grouped by category (toilet, water, break). Each category group SHALL display as a collapsible/expandable section with a category header.

#### Scenario: Items grouped by category in same date column
- **WHEN** viewing 2026-04-14 column with items: toilet at 10:01, water at 11:09, toilet at 14:05
- **THEN** the column SHALL display two category groups: "toilet" containing two time entries, and "water" containing one time entry

#### Scenario: Empty category not shown
- **WHEN** viewing a date column with no break items logged
- **THEN** a "break" category group SHALL NOT appear in that column

### Requirement: Display category count summary
Each category group header SHALL show the category name followed by a count in parentheses (e.g., "toilet (2)").

#### Scenario: Count reflects number of items in category for that date
- **WHEN** viewing a date column with 3 toilet items and 1 water item
- **THEN** the toilet group header SHALL display "toilet (3)" and water group header SHALL display "water (1)"

#### Scenario: Count updates after checking new item
- **WHEN** the user checks a new toilet item on the current date
- **THEN** the toilet (count) header SHALL immediately increment to reflect the new total

### Requirement: Fix add buttons in right sidebar
The three category add buttons (+toilet, +water, +break) SHALL remain visible in a fixed-position sidebar on the right edge of the screen, visible at all times regardless of scroll position.

#### Scenario: Buttons remain visible while scrolling horizontally through dates
- **WHEN** the user scrolls horizontally to view future date columns
- **THEN** the right sidebar with all three add buttons SHALL remain visible and unscrolled

#### Scenario: Clicking button in fixed sidebar adds item to current date
- **WHEN** the user clicks the +toilet button in the right sidebar
- **THEN** a new unchecked toilet item SHALL be added (following existing checklist rules) with timestamp in the current date column

### Requirement: Items display with time only
Within each category group, items SHALL display their completion time in HH:MM format (e.g., 10:01, 14:23). The time SHALL be clickable or otherwise indicate it represents a checked item.

#### Scenario: Checked item shows only time, not full timestamp
- **WHEN** viewing a checked toilet item from 10:01 AM
- **THEN** the item SHALL display as "10:01" (not full date/time)

#### Scenario: Multiple items in same category show distinct times
- **WHEN** viewing toilet column with items checked at 10:01, 11:20, 14:05
- **THEN** all three times SHALL be visible and distinct within the toilet group

### Requirement: Horizontal scroll for date columns
Date columns SHALL be contained in a horizontally scrollable container. The user SHALL be able to scroll left and right to view past and future date columns.

#### Scenario: User scrolls right to view newer dates
- **WHEN** the user scrolls the log area to the right
- **THEN** older date columns move out of view left, and newer date columns come into view on the right

#### Scenario: Today's column is initially centered or right-aligned
- **WHEN** the app loads with historical data
- **THEN** the current date column SHALL be positioned near the right edge (today/recent dates favored in view)
