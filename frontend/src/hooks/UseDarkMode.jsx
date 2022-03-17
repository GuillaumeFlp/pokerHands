import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useDarkMode = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    dispatch({
      type: "UPDATE_THEME",
      data: mode,
    });
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches || !localTheme
      ? setMode(["dark", "light"].includes(window.env.defaultTheme) ? window.env.defaultTheme : "dark" )
      : localTheme
      ? dispatch({
          type: "UPDATE_THEME",
          data: localTheme,
        })
      : setMode("light");
  }, []);

  return [theme, toggleTheme];
};
