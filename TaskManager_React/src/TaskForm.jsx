import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  // ✅ NEW: user state
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const TASK_API = "http://localhost:9220/tasks";
  const USER_API = "http://localhost:9220/api/users";

  // ✅ Load users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(USER_API);
      setUsers(res.data);
    } catch {
      console.error("Failed to load users");
    }
  };

  // ✅ Load task when editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${TASK_API}/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setStatus(res.data.status || "Pending");
          setDueDate(res.data.dueDate || "");

          // ✅ SET USER
          if (res.data.user) {
            setSelectedUserId(res.data.user.id);
          }
        })
        .catch(() => setError("Failed to load task ❌"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // ✅ Submit
  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required ❗");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        description,
        status,
        dueDate: dueDate || null,

        // ✅ IMPORTANT: send user
        user: selectedUserId ? { id: selectedUserId } : null,
      };

      if (id) {
        await axios.put(`${TASK_API}/${id}`, payload);
        setMessage("Task updated successfully ✏️");
      } else {
        await axios.post(TASK_API, payload);
        setMessage("Task added successfully ✅");
      }

      setError("");
      setTimeout(() => navigate("/"), 1000);

    } catch {
      setError("Something went wrong ❌");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <p>Loading task...</p>;

  return (
    <div style={container}>
      <h2>{id ? "✏️ Edit Task" : "➕ Add Task"}</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Title */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={input}
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={input}
      />

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={input}
      >
        <option value="Pending">🟡 Pending</option>
        <option value="In Progress">🔵 In Progress</option>
        <option value="Completed">🟢 Completed</option>
      </select>

      {/* ✅ NEW: Assign User Dropdown */}
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        style={input}
      >
        <option value="">-- Assign User --</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={input}
      />

      {/* Buttons */}
      <button onClick={handleSubmit} style={primaryBtn} disabled={loading}>
        {loading ? "Saving..." : id ? "Update Task" : "Add Task"}
      </button>

      <button onClick={() => navigate("/")} style={secondaryBtn}>
        Cancel
      </button>
    </div>
  );
}

/* Styles */
const container = {
  padding: "20px",
  maxWidth: "400px",
};

const input = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const primaryBtn = {
  background: "#1976d2",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const secondaryBtn = {
  marginLeft: "10px",
  padding: "10px",
  borderRadius: "5px",
};

export default TaskForm;