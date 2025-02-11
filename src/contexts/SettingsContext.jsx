import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // 'navbar' or 'sidebar'
  const [layout, setLayout] = useState("navbar");

  const toggleLayout = () => {
    setLayout((prev) => (prev === "navbar" ? "sidebar" : "navbar"));
  };

  return (
    <SettingsContext.Provider value={{ layout, toggleLayout }}>
      {children}
    </SettingsContext.Provider>
  );
};
