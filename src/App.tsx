import { useState } from 'react';
import { BreakItem } from './types';
import { loadState, saveState } from './storage';
import { ChecklistItem } from './components/ChecklistItem';
import './App.css';

export default function App() {
  const [items, setItems] = useState<BreakItem[]>(() => loadState());

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

  return (
    <div className="app">
      <h1 className="title">Body Break Checklist</h1>
      <div className="checklist">
        {items.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            onCheck={handleCheckItem}
          />
        ))}
      </div>
    </div>
  );
}
