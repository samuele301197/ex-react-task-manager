import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, onSave, task }) {
  const editFormRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTasks = {
      ...task,
      title,
      description,
      status,
    };
    onSave(updatedTasks);
    onClose();
  };

  return (
    <Modal
      title="Modifica Task"
      show={show}
      onClose={onClose}
      confirmText="Salva"
      onConfirm={() => editFormRef.current.requestSubmit()}
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <div>
            <label>Nome</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Descrizione</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div>
            <label>Stato</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </form>
      }
    />
  );
}
