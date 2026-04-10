import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./Dashboard";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import DeletePage from "./DeletePage";
import CalendarPage from "./CalendarPage";
import ChartPage from "./ChartPage";
import KanbanBoard from "./KanbanBoard";
import UserPage from "./UserPage";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TaskList setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CalendarPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TaskForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TaskForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delete/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DeletePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/charts"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ChartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kanban"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <KanbanBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;