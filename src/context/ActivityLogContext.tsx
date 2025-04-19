import { createContext, useState, useEffect } from "react";

export type Activity = {
  id: string;
  message: string;
  timestamp: string;
};

type ActivityLogContextType = {
  logs: Activity[];
  addLog: (message: string) => void;
};

export const ActivityLogContext = createContext<
  ActivityLogContextType | undefined
>(undefined);

export const ActivityLogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [logs, setLogs] = useState<Activity[]>([]);

  useEffect(() => {
    const storedLogs = localStorage.getItem("activityLogs");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activityLogs", JSON.stringify(logs));
  }, [logs]);

  const addLog = (message: string) => {
    const newLog: Activity = {
      id: crypto.randomUUID(),
      message,
      timestamp: new Date().toLocaleString(),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <ActivityLogContext.Provider value={{ logs, addLog }}>
      {children}
    </ActivityLogContext.Provider>
  );
};
