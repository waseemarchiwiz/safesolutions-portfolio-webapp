import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const useDarkMode = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    if (!resolvedTheme?.trim()) return;

    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, [resolvedTheme]);

  return {
    toggleTheme,
    isDarkMode,
    setTheme,
  };
};

export default useDarkMode;
