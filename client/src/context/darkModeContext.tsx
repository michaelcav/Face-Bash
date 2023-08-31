import { createContext, useEffect, useState, ReactNode } from "react";

export const DarkModeContext = createContext<boolean | undefined>(undefined);

export const DarkModeContextProvider = ({ children }: { children: ReactNode })  => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') || true)
  
  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};