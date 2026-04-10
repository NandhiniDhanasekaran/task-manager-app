package com.TaskSpringBoot.taskmanager;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5179")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskRepository repo;
    private final UserRepository userRepo;

    public TaskController(TaskRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    // ✅ GET all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    // ✅ GET task by ID
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

    // ✅ POST create task
    @PostMapping
    public Task createTask(@RequestBody Task task) {

        if (task.getStatus() == null || task.getStatus().isEmpty()) {
            task.setStatus("Backlog");
        }

        if (task.getPriority() == null) {
            task.setPriority("Medium");
        }

        // ✅ FIX: map user properly
        if (task.getUser() != null && task.getUser().getId() != null) {
            User user = userRepo.findById(task.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setUser(user);
        } else {
            task.setUser(null); // Unassigned
        }

        return repo.save(task);
    }

    // ✅ PUT update task (SAFE PARTIAL UPDATE)
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {

        Task task = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));

        if (updatedTask.getTitle() != null) {
            task.setTitle(updatedTask.getTitle());
        }

        if (updatedTask.getDescription() != null) {
            task.setDescription(updatedTask.getDescription());
        }

        if (updatedTask.getStatus() != null) {
            task.setStatus(updatedTask.getStatus());
        }

        if (updatedTask.getPriority() != null) {
            task.setPriority(updatedTask.getPriority());
        }

        if (updatedTask.getDueDate() != null) {
            task.setDueDate(updatedTask.getDueDate());
        }

        // ✅ FIX: correct user mapping
        if (updatedTask.getUser() != null && updatedTask.getUser().getId() != null) {
            User user = userRepo.findById(updatedTask.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setUser(user);
        }

        return repo.save(task);
    }

    // ✅ DELETE task
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        repo.deleteById(id);
        return "Task with id " + id + " deleted successfully!";
    }
}