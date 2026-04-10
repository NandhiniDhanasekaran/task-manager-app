import React, { useEffect, useState } from "react";
import axios from "axios";
import { DndContext, closestCenter, useDraggable, useDroppable } from "@dnd-kit/core";

// Column statuses
const statuses = ["Backlog", "Todo", "In Progress", "Done"];

// Column colors
const columnColors = {
  Backlog: "#dbeafe",
  Todo: "#fef3c7",
  "In Progress": "#e0f2fe",
  Done: "#dcfce7",
};

// Priority colors
const priorityColors = {
  High: "red",
  Medium: "orange",
  Low: "green",
};

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const TASK_API = "http://localhost:9220/tasks";
  const USER_API = "http://localhost:9220/api/users";

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(TASK_API);
    const formatted = res.data.map((t) => ({
      ...t,
      id: t.id.toString(),
      assigneeId: t.user?.id || null,
      priority: t.priority || "Medium",
      status: t.status || "Backlog",
      description: t.description || "", // ✅ added
    }));
    setTasks(formatted);
  };

  const fetchUsers = async () => {
    const res = await axios.get(USER_API);
    setUsers(res.data);
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await axios.put(`${TASK_API}/${taskId}`, { status: newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ UPDATED
  const addTask = async (status, title, description, assigneeId, priority) => {
    const res = await axios.post(TASK_API, {
      title,
      description,
      status,
      user: assigneeId ? { id: Number(assigneeId) } : null,
      priority,
    });

    setTasks((prev) => [
      {
        ...res.data,
        id: res.data.id.toString(),
        assigneeId: res.data.user?.id || null,
        description: res.data.description || "",
      },
      ...prev,
    ]);
  };

  const updateTask = async (taskId, data) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              ...data,
              assigneeId: data.user?.id || t.assigneeId,
            }
          : t
      )
    );
    try {
      await axios.put(`${TASK_API}/${taskId}`, data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    try {
      await axios.delete(`${TASK_API}/${taskId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", padding: "10px" }}>
      <h2 style={{ textAlign: "center", margin: "10px 0" }}>🚀 DevOps Kanban Board</h2>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", flex: 1, gap: "10px" }}>
          {statuses.map((status) => (
            <div key={status} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  textAlign: "center",
                  background: columnColors[status],
                  borderRadius: "6px",
                  padding: "8px 0",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {status} ({tasks.filter((t) => t.status === status).length})
              </div>

              <Column
                status={status}
                tasks={tasks.filter((t) => t.status === status)}
                users={users}
                addTask={addTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

// COLUMN
function Column({ status, tasks, users, addTask, updateTask, deleteTask }) {
  const { setNodeRef } = useDroppable({ id: status });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // ✅ NEW
  const [assigneeId, setAssigneeId] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAdd = () => {
    if (!title.trim()) return;

    addTask(status, title, description, assigneeId || null, priority);

    setTitle("");
    setDescription(""); // ✅ reset
    setAssigneeId("");
    setPriority("Medium");
    setShowForm(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        background: columnColors[status],
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      {!showForm && (
        <button onClick={() => setShowForm(true)} style={{ marginBottom: "10px", background: "#3b82f6", color: "white" }}>
          + New Item
        </button>
      )}

      {showForm && (
        <div style={{ marginBottom: "10px" }}>
          <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", marginBottom: "5px" }} />

          {/* ✅ DESCRIPTION FIELD */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginBottom: "5px" }}
          />

          <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} style={{ width: "100%", marginBottom: "5px" }}>
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: "100%", marginBottom: "5px" }}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={handleAdd} style={{ width: "100%", background: "#16a34a", color: "white" }}>
            Add
          </button>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} users={users} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
}

// TASK CARD
function TaskCard({ task, users, updateTask, deleteTask }) {
  const { setNodeRef, listeners, attributes } = useDraggable({ id: task.id });

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || ""); // ✅ NEW
  const [assigneeId, setAssigneeId] = useState(task.assigneeId || "");
  const [priority, setPriority] = useState(task.priority);

  const assigneeName = users.find((u) => u.id === task.assigneeId)?.name || "Unassigned";

  const handleSave = () => {
    updateTask(task.id, {
      title,
      description, // ✅ NEW
      user: assigneeId ? { id: Number(assigneeId) } : null,
      priority,
    });
    setEditing(false);
  };

  return (
    <div ref={setNodeRef} style={{ background: "white", padding: "10px", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
      <div {...listeners} {...attributes} style={{ cursor: "grab", fontWeight: "bold" }}>
        {task.title}
      </div>

      {/* ✅ SHOW DESCRIPTION */}
      <div style={{ fontSize: "12px", color: "#555", margin: "5px 0" }}>
        {task.description || "No description"}
      </div>

      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", marginBottom: "5px" }} />

          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", marginBottom: "5px" }} />

          <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} style={{ width: "100%", marginBottom: "5px" }}>
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: "100%", marginBottom: "5px" }}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div>👤 {assigneeName}</div>
          <div style={{ color: priorityColors[task.priority] }}>{task.priority}</div>

          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)} style={{ color: "red" }}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default KanbanBoard;