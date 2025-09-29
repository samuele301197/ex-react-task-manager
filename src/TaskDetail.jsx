import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";
import Modal from "./Modal";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);

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
      <button type="button" onClick={() => setShowModal(true)}>
        Elimina Task
      </button>
      <Modal
        title="Conferma Eliminazione"
        content={<p>Sei sicuro di voler eliminare questa task?</p>}
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
    </div>
  );
}
