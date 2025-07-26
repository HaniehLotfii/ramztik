import { useEffect, useState } from "react";
import { setHtmlTheme } from "../utils/theme";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    setHtmlTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <button
      className="ml-2 mr-2 text-sm bg-gray-200 text-cyan-700 rounded-full p-1 px-3"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
