package com.karitchi.library.service;

import com.karitchi.library.dto.UserRegistrationRequest;
import com.karitchi.library.dto.UserResponse;
import com.karitchi.library.model.Role;
import com.karitchi.library.model.User;
import com.karitchi.library.repository.RoleRepository;
import com.karitchi.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public UserResponse registerUser(UserRegistrationRequest request) {
    // Check if email already exists
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email already registered");
    }

    // Get the role (default to 'user' if not specified)
    String roleName = request.getRole() != null ? request.getRole() : "user";
    Role role = roleRepository.findByName(roleName)
        .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

    // Create new user
    User user = new User();
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(role);

    // Save to database
    User savedUser = userRepository.save(user);

    System.out.println("✅ New user registered: " + savedUser.getEmail() + " (Role: " + role.getName() + ")");

    // Return response without password
    return new UserResponse(
        savedUser.getId(),
        savedUser.getEmail(),
        savedUser.getRole().getName(),
        savedUser.getCreatedAt());
  }
}
