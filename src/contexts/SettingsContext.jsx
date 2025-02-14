import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // 'navbar' or 'sidebar'
  let navber = localStorage.getItem('navbar');
  if (!navber) {
    localStorage.setItem('navbar', 'navbar');
  }
  const [layout, setLayout] = useState(
    localStorage.getItem('navbar') || 'navbar'
  );
  const toggleLayout = () => {
    setLayout((prev) => (prev === 'navbar' ? 'sidebar' : 'navbar'));
    localStorage.setItem('navbar', layout);
  };

  return (
    <SettingsContext.Provider value={{ layout, toggleLayout }}>
      {children}
    </SettingsContext.Provider>
  );
};
