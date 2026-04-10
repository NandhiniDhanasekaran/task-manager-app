package com.TaskSpringBoot.taskmanager;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Task {

    @ManyToOne
    @JoinColumn(name = "user_id") // foreign key
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status = "Pending";
    private LocalDate dueDate;

    // ✅ NEW FIELD
    private String priority = "Medium";

    // ✅ Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public LocalDate getDueDate() { return dueDate; }
    public User getUser() { return user; }
    public String getPriority() { return priority; }

    // ✅ Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(String status) { this.status = status; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public void setUser(User user) { this.user = user; }
    public void setPriority(String priority) { this.priority = priority; }

    // ✅ Constructors
    public Task() {}

    public Task(String title, String description, String status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}