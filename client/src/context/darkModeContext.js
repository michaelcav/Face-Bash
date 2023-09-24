import React,{ createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext(undefined);

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggle = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const contextValue = {
    darkMode,
    toggle,
  };

  return React.createElement(
    DarkModeContext.Provider,
    { value: contextValue },
    children
  );
};
