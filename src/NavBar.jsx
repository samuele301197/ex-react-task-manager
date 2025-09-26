import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/add">Add Tasks</NavLink>
      <NavLink to="/tasks">Tasks List</NavLink>
    </nav>
  );
}
