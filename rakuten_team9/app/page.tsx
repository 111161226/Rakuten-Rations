"use client";
import { useState } from "react";

const itemsData = [
  {
    id: 1,
    name: "Item 1",
    size: "Small",
    expiration: "2024-12-31",
    quantity: 5,
  },
  {
    id: 2,
    name: "Item 2",
    size: "Large",
    expiration: "2025-06-30",
    quantity: 3,
  },
  // Add more items as needed
];

export default function Home() {
  const [items, setItems] = useState(itemsData);

  const handleQuantityChange = (id: number, change: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + change };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>Item Management System</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>Size: {item.size}</div>
            <div>Expiration: {item.expiration}</div>
            <div>Quantity: {item.quantity}</div>
            <button onClick={() => handleQuantityChange(item.id, 1)}>
              Increase
            </button>
            <button onClick={() => handleQuantityChange(item.id, -1)}>
              Decrease
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
