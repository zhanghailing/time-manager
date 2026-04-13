import { BreakItem } from '../types';
import './ChecklistItem.css';

interface ChecklistItemProps {
  item: BreakItem;
  onCheck: (id: string) => void;
}

const emojiMap: Record<BreakItem['type'], string> = {
  toilet: '🚽',
  water: '🥤',
  break: '🛌',
};

const labelMap: Record<BreakItem['type'], string> = {
  toilet: 'Toilet',
  water: 'Water',
  break: 'Break',
};

export function ChecklistItem({ item, onCheck }: ChecklistItemProps) {
  if (item.checked) {
    return (
      <div className="checklist-item checked">
        <span className="checkmark">✓</span>
        <span className="label">
          {emojiMap[item.type]} {labelMap[item.type]}
        </span>
        <span className="timestamp">{item.timestamp}</span>
      </div>
    );
  }

  return (
    <button
      className="checklist-item unchecked"
      onClick={() => onCheck(item.id)}
    >
      <span className="emoji">{emojiMap[item.type]}</span>
      <span className="label">{labelMap[item.type]}</span>
    </button>
  );
}
