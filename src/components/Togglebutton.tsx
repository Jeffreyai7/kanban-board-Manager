import { Moon, Sun } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

export default function ToggleButton() {
  const [darkMode, setDarkMode] = useDarkMode() as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];

  return (
    <div className="min-h-screen transition duration-300 bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
