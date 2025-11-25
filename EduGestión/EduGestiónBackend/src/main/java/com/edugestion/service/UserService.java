package com.edugestion.service;

import java.util.List;
import java.util.Optional;
import com.edugestion.dto.CreateUserRequest;
import com.edugestion.dto.UpdateUserRequest;
import com.edugestion.model.User;
import com.edugestion.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> list() { return userRepository.findAll(); }

    public User create(CreateUserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        return userRepository.save(user);
    }

    public Optional<User> findById(String id) { return userRepository.findById(id); }

    public User update(String id, UpdateUserRequest request) {
        User user = userRepository.findById(id).orElseThrow();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        return userRepository.save(user);
    }

    public void delete(String id) { userRepository.deleteById(id); }
}

