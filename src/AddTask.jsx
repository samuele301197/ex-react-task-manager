import { useRef, useState, useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const { addTask } = useContext(GlobalContext);

  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.><?/~`;

  const handleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (value.trim() === "") {
      setError("Errore, nome non può essere vuoto");
      return;
    }
    for (let c of symbols) {
      if (value.includes(c)) {
        setError("Errore, nome non può avere simboli");
        return;
      }
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    const newTask = {
      title: title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      const createTask = await addTask(newTask);
      if (createTask) {
        alert("Task creata con successo!");
        setTitle("");
        descriptionRef.current.value = "";
        statusRef.current.value = "To do";
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Aggiungi Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Nome Task"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div>
          <textarea
            type="text"
            ref={descriptionRef}
            placeholder="Scrivi la descrizione della task..."
          ></textarea>
        </div>
        <div>
          <label>Stato</label>
          <select ref={statusRef} defaultValue="To do">
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit" disabled={error !== ""}>
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}
