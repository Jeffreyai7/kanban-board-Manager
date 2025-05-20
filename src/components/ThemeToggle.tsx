import { useState, useEffect } from "react";

const ThemeToggle = () => {
  // Check if a theme preference exists in localStorage, otherwise use 'light'
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return (
        savedTheme === "dark" ||
        (savedTheme === null &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  // Toggle dark mode and store preference in localStorage
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    // Apply the stored theme when the app loads
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white text-black rounded-md"
    >
      {isDarkMode ? "🌙 Light Mode" : "☀️ Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
