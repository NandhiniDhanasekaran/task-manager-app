import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function ChartPage() {
  const [data, setData] = useState([]);
  const API = "http://localhost:9220/tasks";

  useEffect(() => {
    axios.get(API).then((res) => {
      const tasks = res.data;

      // ✅ Count by status
      const counts = {
        Pending: 0,
        "In Progress": 0,
        Completed: 0,
      };

      tasks.forEach((t) => {
        if (counts[t.status] !== undefined) {
          counts[t.status]++;
        }
      });

      const chartData = [
        { name: "Pending", value: counts.Pending },
        { name: "In Progress", value: counts["In Progress"] },
        { name: "Completed", value: counts.Completed },
      ];

      setData(chartData);
    });
  }, []);

  const COLORS = ["orange", "blue", "green"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Task Analytics</h2>

      {/* Pie Chart */}
      <h3>Status Distribution</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Bar Chart */}
      <h3>Task Status Count</h3>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}

export default ChartPage;