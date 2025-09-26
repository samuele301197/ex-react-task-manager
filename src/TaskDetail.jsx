import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);

  const task = tasks.find((t) => t.id.toString() === id);

  if (!task) return <h2>Task non trovata!</h2>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p>
        <strong>Descrizione:</strong> {task.description}
      </p>
      <p>
        <strong>Stato:</strong> {task.status}
      </p>
      <p>
        <strong>Creata il:</strong>
        {new Date(task.createdAt).toLocaleDateString("it-IT")}
      </p>
      <button type="button" onClick={() => console.log("Elimino Task")}>
        Elimina Task
      </button>
    </div>
  );
}
