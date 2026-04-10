import axios from "axios";

// Base URL of your Spring Boot backend
const API = "http://localhost:9220/api/users";

// Get all users
export const getUsers = () => axios.get(API);

// Add a new user
export const addUser = (data) => axios.post(API, data);

// Update an existing user
export const updateUser = (id, data) => axios.put(`${API}/${id}`, data);

// Delete a user
export const deleteUser = (id) => axios.delete(`${API}/${id}`);