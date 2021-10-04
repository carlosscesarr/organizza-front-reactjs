import { useState, useEffect, useCallback } from "react";

export const useThemeState = () => {
  const [theme, setTheme] = useState(() => {
    const storageValue = localStorage.getItem("themee");
    return storageValue ?? "ligth";
  });

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "ligth" : "dark"));
  }, []);

  useEffect(() => {
    localStorage.setItem("themee", "ligth");
    document.documentElement.classList.remove(
      `theme-${theme === "ligth" ? "dark" : "ligth"}`
    );
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);
  return [theme, toggleTheme];
};
