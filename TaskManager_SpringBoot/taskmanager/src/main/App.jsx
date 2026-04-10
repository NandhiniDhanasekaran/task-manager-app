import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Action buttons
const ActionRenderer = (props) => {
  return (
    <div>
      <button onClick={() => props.context.deleteTask(props.data.id)}>
        Delete
      </button>
    </div>
  );
};

function App() {
  const [rowData, setRowData] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: ""
  });

  const columnDefs = [
    { headerName: "ID", field: "id", width: 90 },
    { headerName: "Title", field: "title", flex: 1, editable: true },
    { headerName: "Description", field: "description", flex: 2, editable: true },
    { headerName: "Actions", cellRenderer: ActionRenderer }
  ];

  // ✅ Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get("http://localhost:8080/tasks")
      .then(res => setRowData(res.data))
      .catch(err => console.error(err));
  };

  // ✅ Add new task
  const addTask = () => {
    axios.post("http://localhost:8080/tasks", newTask)
      .then(() => {
        fetchTasks();
        setNewTask({ title: "", description: "" });
      })
      .catch(err => console.error(err));
  };

  // ✅ Delete task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/tasks/${id}`)
      .then(() => fetchTasks())
      .catch(err => console.error(err));
  };

  // ✅ Update on cell edit
  const onCellValueChanged = (params) => {
    axios.put(`http://localhost:8080/tasks/${params.data.id}`, params.data)
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      
      <h2>Task Manager</h2>

      {/* ✅ Add Task Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />
        <input
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* ✅ AG Grid */}
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          context={{ deleteTask }}
          defaultColDef={{ sortable: true, filter: true }}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
}

export default App;