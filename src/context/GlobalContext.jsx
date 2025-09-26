import { createContext } from "react";
import useTasks from "../useTasks";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const { tasks, error, addTask, removeTask, updateTask } = useTasks();

  return (
    <GlobalContext.Provider
      value={{ tasks, error, addTask, removeTask, updateTask }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
