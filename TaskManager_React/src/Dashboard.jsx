import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [chartData, setChartData] = useState([]);

  const navigate = useNavigate();
  const API = "http://localhost:9220/tasks";

  useEffect(() => {
    axios.get(API).then((res) => {
      setTasks(res.data);

      // ✅ Count status
      const counts = {
        Pending: 0,
        "In Progress": 0,
        Completed: 0,
      };

      res.data.forEach((t) => {
        if (counts[t.status] !== undefined) {
          counts[t.status]++;
        }
      });

      const data = [
        { name: "Pending", value: counts.Pending },
        { name: "In Progress", value: counts["In Progress"] },
        { name: "Completed", value: counts.Completed },
      ];

      setChartData(data);
    });
  }, []);

  // 🎨 Colors for charts
  const COLORS = ["orange", "blue", "green"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard</h1>

      {/* Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={card}>
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div style={card}>
          <h3>Quick Actions</h3>
          <button onClick={() => navigate("/add")}>➕ Add Task</button>
          <br /><br />
          <button onClick={() => navigate("/")}>📋 View Tasks</button>
        </div>
        
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
        
        {/* Pie Chart */}
        <div>
          <h3>Status Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`pie-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart (Colorful) */}
        <div>
          <h3>Task Count</h3>
          <BarChart width={400} height={300} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="value" label>
              {chartData.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </div>

      </div>
    </div>
  );
}

/* Card Style */
const card = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  width: "200px",
};

export default Dashboard;