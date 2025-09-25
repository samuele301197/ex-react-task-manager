import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import NavBar from "./NavBar";
import GlobalProvider from "./context/GlobalContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <NavBar />
        <Routes>
          <Route path="/add" element={<AddTask />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="*" element={<h1>Pagina non trovata</h1>} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
