import { CategoryGroup as CategoryGroupType } from '../utils/groupLogs';
import { LogItemTime } from './LogItemTime';

interface CategoryGroupProps {
  group: CategoryGroupType;
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

export function CategoryGroup({ group }: CategoryGroupProps) {
  return (
    <div className="category-group">
      <div className="category-header">
        <span className="category-emoji">{emojiMap[group.category]}</span>
        <span className="category-label">
          {labelMap[group.category]} ({group.count})
        </span>
      </div>
      <div className="category-items">
        {group.items.map((item) => (
          <LogItemTime key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
