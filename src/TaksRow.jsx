import { memo } from "react";

function TaskRow({ task }) {
  let style = {};

  if (task.status === "ToDo") {
    style = { backgroundColor: "red", color: "white" };
  } else if (task.status === "Doing") {
    style = { backgroundColor: "yellow", color: "black" };
  } else if (task.status === "Done") {
    style = { backgroundColor: "green", color: "black" };
  }

  return (
    <tr>
      <td>{task.title}</td>
      <td style={style}>{task.status}</td>
      <td>{new Date(task.created_at).toLocaleDateString("it-IT")}</td>
    </tr>
  );
}

export default memo(TaskRow);
