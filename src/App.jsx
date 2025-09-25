import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import NavBar from "./NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/add" element={<AddTask />} />
        <Route path="/list" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
