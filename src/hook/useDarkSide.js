import { useEffect, useState } from "react";
import { CHANGE_THEME } from "../actions/types";
import store from "../store";

export default function useDarkSide() {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    store.dispatch({
      type: CHANGE_THEME,
      payload: theme,
    });

    // Save theme to local Storage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return { colorTheme, setTheme };
}
