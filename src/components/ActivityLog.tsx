import { useActivityLog } from "../hooks/UseActivityLog";

const ActivityLog = () => {
  const { logs } = useActivityLog();

  return (
    <div className="bg-blue-400 dark:bg-gray-800 p-4 rounded-md shadow w-full max-w-2xl mx-auto mt-6">
      <h3 className="font-semibold text-lg mb-4 text-center">Activity Log</h3>
      <ul className="space-y-2 text-sm">
        {logs.map((log) => (
          <li key={log.id} className="text-gray-700 dark:text-gray-300">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
              {log.timestamp}:
            </span>
            {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
