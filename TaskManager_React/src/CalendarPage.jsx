import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import axios from "axios";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const API = "http://localhost:9220/tasks"; // ⚠️ change to your backend port

  useEffect(() => {
    axios.get(API).then((res) => {
      console.log(res.data); // debug: shows tasks in console

      // ✅ Format tasks for FullCalendar
      const formatted = res.data
        .filter((task) => task.dueDate) // only tasks with dueDate
        .map((task) => ({
          id: task.id, // ✅ needed for click
          title: task.title,
          start: task.dueDate, // FullCalendar expects 'start'
          color:
            task.status === "Completed"
              ? "green"
              : task.status === "In Progress"
              ? "blue"
              : "orange",
        }));

      setEvents(formatted);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Task Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        // ✅ Click to edit task
        eventClick={(info) => {
          const taskId = info.event.id;
          window.location.href = `/edit/${taskId}`;
        }}
      />
    </div>
  );
}

export default CalendarPage;