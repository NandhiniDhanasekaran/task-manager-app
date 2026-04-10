package com.TaskSpringBoot.taskmanager;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5179") // React dev server
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAllUsers() {
    	try {
            return service.getAllUsers(); // should return List<User>
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch users", e);
        }
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return service.addUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return service.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
    }
    
    @GetMapping("/test")
    public String test() {
        return "API is working!";
    }
    
    
        
}
