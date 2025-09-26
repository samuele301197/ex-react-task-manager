import { useRef, useState } from "react";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const textRef = useRef();
  const statusRef = useRef();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title: title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    console.log(newTask);
  };

  return (
    <div>
      <h2>Aggiungi Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome Task</label>
          <input type="text" value={title} onChange={handleChange} />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div>
          <textarea
            type="text"
            ref={textRef}
            placeholder="Scrivi la descrizione"
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
