import { DateGroup } from '../utils/groupLogs';
import { CategoryGroup } from './CategoryGroup';

interface LogColumnProps {
  dateGroup: DateGroup;
}

export function LogColumn({ dateGroup }: LogColumnProps) {
  return (
    <div className="log-column">
      <div className="column-date-header">{dateGroup.date}</div>
      <div className="column-content">
        {dateGroup.categories.map((category) => (
          <CategoryGroup key={category.category} group={category} />
        ))}
      </div>
    </div>
  );
}
