import { BreakItem } from '../types';

export type CategoryGroup = {
  category: 'toilet' | 'water' | 'break';
  count: number;
  items: BreakItem[];
};

export type DateGroup = {
  date: string; // YYYY-MM-DD format
  categories: CategoryGroup[];
};

export type GroupedLogs = {
  dateGroups: DateGroup[];
  uncheckedItems: BreakItem[]; // Items without timestamp (current/today's unchecked)
};

/**
 * Transform a flat array of BreakItems into grouped structure
 * Groups checked items by date, then by category
 * Keeps unchecked items separate
 */
export function groupLogsByDateAndCategory(items: BreakItem[]): GroupedLogs {
  const checkedItems = items.filter((item) => item.checked);
  const uncheckedItems = items.filter((item) => !item.checked);

  // Group checked items by date
  const dateMap = new Map<string, BreakItem[]>();

  checkedItems.forEach((item) => {
    if (item.timestamp) {
      // Extract YYYY-MM-DD from timestamp (format: "yyyy-mm-dd hh:mm:ss")
      const date = item.timestamp.split(' ')[0];
      if (!dateMap.has(date)) {
        dateMap.set(date, []);
      }
      dateMap.get(date)!.push(item);
    }
  });

  // Convert to sorted date groups with category grouping
  const dateGroups = Array.from(dateMap.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, itemsForDate]) => {
      // Group items by category for this date
      const categoryMap = new Map<'toilet' | 'water' | 'break', BreakItem[]>();

      itemsForDate.forEach((item) => {
        if (!categoryMap.has(item.type)) {
          categoryMap.set(item.type, []);
        }
        categoryMap.get(item.type)!.push(item);
      });

      // Convert to CategoryGroup array, sorted by category type for consistent order
      const categoryOrder: ('toilet' | 'water' | 'break')[] = ['toilet', 'water', 'break'];
      const categories: CategoryGroup[] = categoryOrder
        .filter((type) => categoryMap.has(type))
        .map((type) => ({
          category: type,
          count: categoryMap.get(type)!.length,
          items: categoryMap.get(type)!,
        }));

      return { date, categories };
    });

  return { dateGroups, uncheckedItems };
}
