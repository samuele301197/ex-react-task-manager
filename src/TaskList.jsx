import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "./context/GlobalContext";
import TaskRow from "./TasksRow.jsx";

export default function TaskList() {
  const { tasks, error } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState("CreatedAt");
  const [sortOrder, setSortOrder] = useState(1);

  if (error) {
    return <h3>Errore: {error.message}</h3>;
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => -prev);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const sortedTasks = useMemo(() => {
    const statusOrder = { "To do": 0, Doing: 1, Done: 2 };

    return [...tasks].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        comparison = statusOrder[a.status] - statusOrder[b.status];
      } else if (sortBy === "createdAt") {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return comparison * sortOrder;
    });
  }, [tasks, sortBy, sortOrder]);

  return (
    <>
      <h2>Lista dei Tasks</h2>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => handleSort("title")}
              style={{ cursor: "pointer" }}
            >
              Nome {sortBy === "title" && (sortOrder === 1 ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("status")}
              style={{ cursor: "pointer" }}
            >
              Stato {sortBy === "status" && (sortOrder === 1 ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("createdAt")}
              style={{ cursor: "pointer" }}
            >
              Data Creazione
              {sortBy === "createdAt" && (sortOrder === 1 ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </>
  );
}
