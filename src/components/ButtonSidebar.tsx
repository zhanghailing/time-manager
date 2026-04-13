interface ButtonSidebarProps {
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
      {handlers.map(({ type, handler }) => (
        <button
          key={type}
          className="add-button"
          onClick={handler}
          title={`Add ${labelMap[type]}`}
        >
          <span className="button-emoji">{emojiMap[type]}</span>
          <span className="button-label">+</span>
        </button>
      ))}
    </div>
  );
}
