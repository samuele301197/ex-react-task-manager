import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);

  const task = tasks.find((t) => t.id.toString() === id);

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task rimossa con successo");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

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
      <button type="button" onClick={handleDelete}>
        Elimina Task
      </button>
    </div>
  );
}
