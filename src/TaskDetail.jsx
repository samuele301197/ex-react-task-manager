import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";
import EditTaskModal from "./EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleSave = async () => {
    try {
      await updateTask(updatedTask.id, updatedTask);
      alert("Task modificata con successo");
      setShowModal(false);
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
      <button type="button" onClick={() => setShowEditModal(true)}>
        Modifica Task
      </button>
      <button type="button" onClick={handleDelete}>
        Elimina Task
      </button>

      <EditTaskModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={handleSave}
      />
    </div>
  );
}
