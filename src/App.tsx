import { useState } from 'react';
import { BreakItem } from './types';
import { loadState, saveState } from './storage';
import { useGroupedLogs } from './hooks/useGroupedLogs';
import { LogColumnView } from './components/LogColumnView';
import { ButtonSidebar } from './components/ButtonSidebar';
import './App.css';

export default function App() {
  const [items, setItems] = useState<BreakItem[]>(() => loadState());
  const groupedLogs = useGroupedLogs(items);

  const handleCheckItem = (id: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id && !item.checked) {
          // Get current yyyy-mm-dd hh:mm:ss format
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');
          const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

          return { ...item, checked: true, timestamp };
        }
        return item;
      });

      // If the item was checked, add a new unchecked item of the same type
      const checkedItem = prevItems.find((item) => item.id === id);
      if (checkedItem && !checkedItem.checked) {
        const newId = String(Math.max(...updatedItems.map((i) => parseInt(i.id, 10)), 0) + 1);
        updatedItems.push({
          id: newId,
          type: checkedItem.type,
          checked: false,
          timestamp: null,
        });
      }

      // Save to localStorage
      saveState(updatedItems);
      return updatedItems;
    });
  };

  const handleAddItem = (type: 'toilet' | 'water' | 'break') => {
    setItems((prevItems) => {
      const newId = String(Math.max(...prevItems.map((i) => parseInt(i.id, 10)), 0) + 1);
      const newItems = [
        ...prevItems,
        {
          id: newId,
          type,
          checked: false,
          timestamp: null,
        },
      ];
      saveState(newItems);
      return newItems;
    });
  };

  return (
    <div className="app">
      <div className="main-layout">
        <div className="content-area">
          <h1 className="title">Body Break Checklist</h1>
          <LogColumnView groupedLogs={groupedLogs} />
        </div>
        <ButtonSidebar
          uncheckedItems={groupedLogs.uncheckedItems}
          onCheck={handleCheckItem}
          onAddToilet={() => handleAddItem('toilet')}
          onAddWater={() => handleAddItem('water')}
          onAddBreak={() => handleAddItem('break')}
        />
      </div>
    </div>
  );
}
