import { useMemo } from 'react';
import { BreakItem } from '../types';
import { groupLogsByDateAndCategory, GroupedLogs } from '../utils/groupLogs';

export function useGroupedLogs(items: BreakItem[]): GroupedLogs {
  return useMemo(() => groupLogsByDateAndCategory(items), [items]);
}
