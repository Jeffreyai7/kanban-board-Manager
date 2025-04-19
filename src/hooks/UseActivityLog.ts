import { useContext } from "react";
import { ActivityLogContext } from "../context/ActivityLogContext";

export const useActivityLog = () => {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error(
      "useActivityLog must be used within an ActivityLogProvider"
    );
  }
  return context;
};
