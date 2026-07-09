import { THEME_STORAGE_KEY } from "@/constants";
import type { Theme } from "@/types/theme";

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }
  } catch {
    // Ignore storage errors
  }

  const theme = document.documentElement.getAttribute("data-theme");

  return theme === "light" ? "light" : "dark";
}
