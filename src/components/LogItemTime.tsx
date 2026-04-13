import { BreakItem } from '../types';

interface LogItemTimeProps {
  item: BreakItem;
}

export function LogItemTime({ item }: LogItemTimeProps) {
  if (!item.checked || !item.timestamp) {
    return null;
  }

  // Extract HH:MM from timestamp (format: "yyyy-mm-dd hh:mm:ss")
  const time = item.timestamp.split(' ')[1].slice(0, 5); // Get "hh:mm"

  return <div className="log-item-time">{time}</div>;
}
