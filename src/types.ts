export type BreakItem = {
  id: string;
  type: 'toilet' | 'water' | 'break';
  checked: boolean;
  timestamp: string | null;
};
