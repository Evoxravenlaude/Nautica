import { useCallback, useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem("nautica-theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        localStorage.setItem("nautica-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        localStorage.setItem("nautica-theme", "light");
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
