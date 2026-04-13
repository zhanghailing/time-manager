import { BreakItem } from '../types';

interface ButtonSidebarProps {
  uncheckedItems: BreakItem[];
  onCheck: (id: string) => void;
  onAddToilet: () => void;
  onAddWater: () => void;
  onAddBreak: () => void;
}

const emojiMap: Record<'toilet' | 'water' | 'break', string> = {
  toilet: '🚽',
  water: '🥤',
  break: '🛌',
};

const labelMap: Record<'toilet' | 'water' | 'break', string> = {
  toilet: 'Toilet',
  water: 'Water',
  break: 'Break',
};

export function ButtonSidebar({
  uncheckedItems,
  onCheck,
  onAddToilet,
  onAddWater,
  onAddBreak,
}: ButtonSidebarProps) {
  const handlers = [
    { type: 'toilet' as const, handler: onAddToilet },
    { type: 'water' as const, handler: onAddWater },
    { type: 'break' as const, handler: onAddBreak },
  ];

  return (
    <div className="button-sidebar">
      <div className="unchecked-items-section">
        {uncheckedItems.map((item) => (
          <button
            key={item.id}
            className="unchecked-item-button"
            onClick={() => onCheck(item.id)}
            title={`Check ${labelMap[item.type]}`}
          >
            <span className="button-emoji">{emojiMap[item.type]}</span>
            <span className="button-label">{labelMap[item.type]}</span>
          </button>
        ))}
      </div>
      <div className="add-buttons-section">
        {handlers.map(({ type, handler }) => (
          <button
            key={`add-${type}`}
            className="add-button"
            onClick={handler}
            title={`Add ${labelMap[type]}`}
          >
            <span className="button-emoji">{emojiMap[type]}</span>
            <span className="button-label">+</span>
          </button>
        ))}
      </div>
    </div>
  );
}
