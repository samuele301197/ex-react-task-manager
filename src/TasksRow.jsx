import { memo } from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {
  let style = {};

  if (task.status === "To do") {
    style = { backgroundColor: "red", color: "white" };
  } else if (task.status === "Doing") {
    style = { backgroundColor: "yellow", color: "black" };
  } else if (task.status === "Done") {
    style = { backgroundColor: "green", color: "black" };
  }

  return (
    <tr>
      <td>
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </td>
      <td style={style}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString("it-IT")}</td>
    </tr>
  );
}

export default memo(TaskRow);
