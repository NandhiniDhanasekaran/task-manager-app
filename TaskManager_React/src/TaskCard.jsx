function TaskCard({ task }) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "10px",
        margin: "10px 0",
        background: "white",
        borderLeft: "4px solid orange",
        borderRadius: "6px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
    >
      {/* ID + Title */}
      <strong>
        {task.id} {task.title}
      </strong>

      {/* Assignee */}
      <p style={{ fontSize: "12px", color: "gray" }}>
        👤 {task.assignee || "Unassigned"}
      </p>

      {/* Priority */}
      <p style={{ fontSize: "12px", fontWeight: "bold" }}>
        {task.priority}
      </p>
    </div>
  );
}