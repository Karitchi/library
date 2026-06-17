package com.karitchi.library.controller;

import com.karitchi.library.dto.LoginRequest;
import com.karitchi.library.dto.LoginResponse;
import com.karitchi.library.dto.UserRegistrationRequest;
import com.karitchi.library.dto.UserResponse;
import com.karitchi.library.service.AuthService;
import com.karitchi.library.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @Autowired
  private UserService userService;

  @PostMapping("/signin")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
    try {
      LoginResponse response = authService.authenticate(request);
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(new ErrorResponse(e.getMessage()));
    }
  }

  @PostMapping("/signup")
  public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
    try {
      UserResponse newUser = userService.registerUser(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().build();
    }
  }

  @GetMapping("/check-email")
  public ResponseEntity<?> checkEmailExists(@RequestParam String email) {
    return ResponseEntity.ok().build();
  }

  static class ErrorResponse {
    private String error;

    public ErrorResponse(String error) {
      this.error = error;
    }

    public String getError() {
      return error;
    }

    public void setError(String error) {
      this.error = error;
    }
  }
}
