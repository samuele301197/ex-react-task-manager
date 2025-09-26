import { useEffect, useState } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        if (!res.ok) throw new Error("Errore fetch");
        const data = await res.json();
        console.log(data);

        setTasks(data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    fetchTasks();
  }, []);

  const addTask = (task) => {};
  const removeTask = (taskId) => {};
  const updateTask = (taskId, taskUpdate) => {};

  return { tasks, setTasks, error, addTask, removeTask, updateTask };
}
