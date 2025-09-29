import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "./context/GlobalContext";
import TaskRow from "./TasksRow.jsx";

export default function TaskList() {
  const { tasks, error } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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

  const debounce = useCallback((fn, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }, []);

  const handleSearchDebounced = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 300),
    [debounce]
  );

  const sortedTasks = useMemo(() => {
    const statusOrder = { "To do": 0, Doing: 1, Done: 2 };

    return [...tasks]
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
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
  }, [tasks, sortBy, sortOrder, searchQuery]);

  return (
    <>
      <h2>Lista dei Tasks</h2>
      <input
        type="text"
        placeholder="Cerca..."
        onChange={(e) => handleSearchDebounced(e.target.value)}
      />
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
