package com.karitchi.library.controller;

import com.karitchi.library.dto.UserRegistrationRequest;
import com.karitchi.library.dto.UserResponse;
import com.karitchi.library.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  // POST endpoint to create a new user
  @PostMapping("/register")
  public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
    try {
      UserResponse newUser = userService.registerUser(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().build();
    }
  }

  // Optional: GET endpoint to check if email exists
  @GetMapping("/check-email")
  public ResponseEntity<?> checkEmailExists(@RequestParam String email) {
    // This would require adding a method to UserService
    return ResponseEntity.ok().build();
  }
}
