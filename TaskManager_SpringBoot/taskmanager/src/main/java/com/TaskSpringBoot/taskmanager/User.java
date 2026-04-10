package com.TaskSpringBoot.taskmanager;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users") // ✅ explicit table name
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String role = "User";

    private LocalDate createdDate;
    
   

    // Automatically set createdDate
    @PrePersist
    protected void onCreate() {
        if (createdDate == null) {
            createdDate = LocalDate.now();
        }
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public LocalDate getCreatedDate() { return createdDate; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(String role) { this.role = role; }
    public void setCreatedDate(LocalDate createdDate) { this.createdDate = createdDate; }
}