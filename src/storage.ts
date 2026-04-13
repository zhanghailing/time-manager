import { BreakItem } from './types';

const STORAGE_KEY = 'break-items';

export function loadState(): BreakItem[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // If parsing fails, return default
    }
  }
  // Default: one item per type
  return [
    { id: '1', type: 'toilet', checked: false, timestamp: null },
    { id: '2', type: 'water', checked: false, timestamp: null },
    { id: '3', type: 'break', checked: false, timestamp: null },
  ];
}

export function saveState(items: BreakItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
