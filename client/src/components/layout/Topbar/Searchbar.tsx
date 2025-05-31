import { useTaskContext } from "../../../context/TaskContext";
import { useEffect, useRef } from "react";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectTask: (taskId: string) => void;
  // tasks: Task[];
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onSelectTask,
}) => {
  const { tasks } = useTaskContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setSearchTerm]);

  const filtered = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <input
        type="search"
        className="w-full border border-gray-300 px-3 py-1 rounded-lg outline-none text-gray-800 dark:text-gray-100"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full bg-white border rounded shadow z-50 max-h-60 overflow-y-auto"
        >
          {filtered.length > 0 ? (
            filtered.map((task) => (
              <div
                key={task.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  onSelectTask(task.id);
                  setSearchTerm("");
                }}
              >
                {task.title}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500 select-none">
              No tasks found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
