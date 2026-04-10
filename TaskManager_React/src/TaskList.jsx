import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");

  const navigate = useNavigate();

  const TASK_API = "http://localhost:9220/tasks";
  const USER_API = "http://localhost:9220/api/users";

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(TASK_API);
      setTasks(res.data);
      setError("");
    } catch {
      setError("Failed to load tasks ❌");
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(USER_API);
      setUsers(res.data);
    } catch {
      console.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    const statusMatch = filter === "All" || t.status === filter;
    const userMatch =
      userFilter === "All" ||
      (t.user && t.user.id.toString() === userFilter);

    return statusMatch && userMatch;
  });

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${TASK_API}/${id}`, { status: newStatus });
      fetchTasks();
    } catch {
      alert("Failed to update status ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => navigate("/add")}>➕ Add Task</button>

        <button onClick={() => navigate("/dashboard")} style={{ marginLeft: "30px" }}>
          📊 Dashboard
        </button>

        <button onClick={() => navigate("/calendar")} style={{ marginLeft: "30px" }}>
          📅 Calendar
        </button>

        <button onClick={() => navigate("/kanban")} style={{ marginLeft: "30px" }}>
          📌 Kanban
        </button>

        <button onClick={() => navigate("/users")} style={{ marginLeft: "30px" }}>
          👥 Users
        </button>

              <button
  onClick={() => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  }}
  style={{ marginLeft: "150px", background: "blue", color: "white" }}
>
  🚪 Logout
</button>

      </div>


      {/* Filters */}
      <div style={{ marginTop: "15px" }}>
        <strong>Status: </strong>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <strong style={{ marginLeft: "15px" }}>User: </strong>
        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
          <option value="All">All</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned User</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No tasks found
              </td>
            </tr>
          ) : (
            filteredTasks.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{t.description}</td>

                <td>
                  <select
                    value={t.status || "Pending"}
                    onChange={(e) => updateStatus(t.id, e.target.value)}
                    style={getStatusStyle(t.status)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>

                <td style={{ fontWeight: "bold" }}>
                  {t.user ? t.user.name : "Unassigned"}
                </td>

                <td>
                  <button onClick={() => navigate(`/edit/${t.id}`)}>
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => navigate(`/delete/${t.id}`)}
                    style={{ marginLeft: "10px" }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Status styles
const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return { background: "orange", color: "white" };
    case "In Progress":
      return { background: "blue", color: "white" };
    case "Completed":
      return { background: "green", color: "white" };
    default:
      return {};
  }
};

export default TaskList;