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

  const addTask = async (task) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      if (data.success) {
        setTasks((prev) => [...prev, data.task]);
        return data.task;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const removeTask = async (taskId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Errore nella chiamata DELETE");
      const data = await res.json();
      if (data.success) {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateTask = (taskId, taskUpdate) => {};

  return { tasks, setTasks, error, addTask, removeTask, updateTask };
}
