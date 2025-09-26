import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { TaskRow } from "./TaksRow";

export default function TaskList() {
  const [tasks, error] = useContext(GlobalContext);

  if (error) {
    return <h3>Errore: {error.message}</h3>;
  }

  return (
    <div>
      <h2>Lista dei Tasks</h2>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Stato</th>
          <th>Data Creazione</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          <TaskRow key={task.id} task={task} />;
        })}
      </tbody>
    </div>
  );
}
