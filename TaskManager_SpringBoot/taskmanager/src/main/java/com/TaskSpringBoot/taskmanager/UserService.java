package com.TaskSpringBoot.taskmanager;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User addUser(User user) {
        return repo.save(user);
    }

    public User updateUser(Long id, User user) {
        User existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        existing.setRole(user.getRole());
        return repo.save(existing);
    }

    public void deleteUser(Long id) {
        repo.deleteById(id);
    }

    public User getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }
}
