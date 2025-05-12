import { Moon, Sun } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

export default function ToggleButton() {
  const [isDark, setIsDark] = useDarkMode() as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];

  return (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      className="flex items-center gap-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
