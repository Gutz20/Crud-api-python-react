import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TaskFormPage, TaskPage } from "./pages";
import { Navigation } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />

        <Routes>
          <Route
            path="/"
            element={<Navigate to="tasks" />}
          />
          <Route
            path="/tasks"
            element={<TaskPage />}
          />
          <Route
            path="/tasks/new"
            element={<TaskFormPage />}
          />
          <Route
            path="/tasks/new/:id"
            element={<TaskFormPage />}
          />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
