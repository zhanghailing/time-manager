import { GroupedLogs } from '../utils/groupLogs';
import { LogColumn } from './LogColumn';

interface LogColumnViewProps {
  groupedLogs: GroupedLogs;
}

export function LogColumnView({ groupedLogs }: LogColumnViewProps) {
  const { dateGroups } = groupedLogs;

  if (dateGroups.length === 0) {
    return (
      <div className="log-column-view empty-state">
        <p>No logged items yet. Add items to see them appear in columns by date.</p>
      </div>
    );
  }

  return (
    <div className="log-column-view">
      {dateGroups.map((dateGroup) => (
        <LogColumn key={dateGroup.date} dateGroup={dateGroup} />
      ))}
    </div>
  );
}
