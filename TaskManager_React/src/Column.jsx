function Column({ status, tasks, addTask }) {
  const { setNodeRef } = useDroppable({ id: status });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("Unassigned");
  const [priority, setPriority] = useState("Medium");

  // When user clicks "Add Task"
  const handleAddItem = () => {
    if (!title.trim()) return; // don't allow empty title

    // Call the addTask function from parent with all info
    addTask(status, title, assignee, priority);

    // Reset form
    setTitle("");
    setAssignee("Unassigned");
    setPriority("Medium");
    setShowForm(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "260px",
        minHeight: "400px",
        padding: "10px",
        background: "#f4f4f4",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>
        {status} ({tasks.length})
      </h3>

      {/* Form for adding new task */}
      {showForm && (
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Task Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "5px",
            }}
          />

          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "5px",
            }}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "5px",
            }}
          >
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <button
            onClick={handleAddItem}
            style={{
              width: "100%",
              padding: "6px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Add Task
          </button>
        </div>
      )}

      {/* Show + New Item button when form is hidden */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            background: "#3b82f6",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + New Item
        </button>
      )}

      {/* Render tasks in this column */}
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}