import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeletePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API = "http://localhost:9220/tasks";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/${id}`)
      .then(res => {
        setTask(res.data);
        setError("");
      })
      .catch(() => setError("Failed to load task ❌"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/${id}`);
      setMessage("Task deleted successfully 🗑️");
      setError("");

      setTimeout(() => navigate("/"), 1000);
    } catch {
      setError("Failed to delete task ❌");
      setMessage("");
    }
  };

  if (loading) return <p>Loading task...</p>;
  if (!task) return <p>{error || "Task not found ❌"}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>⚠️ Delete Task</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Task Info */}
      <div style={cardStyle}>
        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Description:</strong> {task.description}</p>

        {/* ✅ Status Added */}
        <p>
          <strong>Status:</strong>{" "}
          <span style={getStatusStyle(task.status)}>
            {task.status || "Pending"}
          </span>
        </p>
      </div>

      <p style={{ marginTop: "15px", color: "red" }}>
        Are you sure you want to delete this task?
      </p>

      <button onClick={handleDelete} style={deleteBtn}>
        Yes, Delete
      </button>

      <button
        onClick={() => navigate("/")}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>
    </div>
  );
}

// ✅ Card style
const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "10px",
  background: "#f9f9f9"
};

// ✅ Status colors
const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return { background: "orange", color: "white", padding: "5px 10px", borderRadius: "10px" };
    case "In Progress":
      return { background: "blue", color: "white", padding: "5px 10px", borderRadius: "10px" };
    case "Completed":
      return { background: "green", color: "white", padding: "5px 10px", borderRadius: "10px" };
    default:
      return { background: "gray", color: "white", padding: "5px 10px", borderRadius: "10px" };
  }
};

// ✅ Delete button style
const deleteBtn = {
  background: "red",
  color: "white",
  padding: "8px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default DeletePage;