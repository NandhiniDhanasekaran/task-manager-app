import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "./api/userApi";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "User" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      setError("Failed to load users ❌");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateUser(editingId, form);
      } else {
        await addUser(form);
      }

      setForm({ name: "", email: "", role: "User" });
      setEditingId(null);
      loadUsers();
    } catch {
      alert("Error saving user ❌");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setEditingId(user.id);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch {
      alert("Error deleting user ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>👥 User Management</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
        </select>

        <button type="submit" style={{ marginLeft: "10px" }}>
          {editingId ? "Update User" : "Add User"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: "", email: "", role: "User" });
              setEditingId(null);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* ✅ TABLE */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>

                <td>
                  <button onClick={() => handleEdit(u)}>✏️ Edit</button>

                  <button
                    onClick={() => handleDelete(u.id)}
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

export default UserPage;