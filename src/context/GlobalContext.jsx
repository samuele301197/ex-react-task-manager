import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        if (!res.ok) throw new Error("Errore nel fetch dei tasks");
        const data = await res.json();
        console.log("Dati ricevuti dall'API:", data);
        setTasks(data);
      } catch (err) {
        console.error("Errore", err);
        setError(err);
      }
    };
    fetchTasks();
  }, []);

  const addTask = (task) => setTasks((prev) => [...prev, task]);

  return (
    <GlobalContext.Provider value={{ tasks, addTask, error }}>
      {children}
    </GlobalContext.Provider>
  );
}
