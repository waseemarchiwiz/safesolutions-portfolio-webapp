import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Set the initial theme based on system preference
    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDark(systemPreference);
    document.body.classList.toggle("dark", systemPreference);
  }, []);

  const toggleTheme = () => {
    setDark((prevDark) => {
      const newDarkState = !prevDark;
      document.body.classList.toggle("dark", newDarkState);
      return newDarkState;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
