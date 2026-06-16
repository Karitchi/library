package com.karitchi.library.controller;

import com.karitchi.library.dto.LoginRequest;
import com.karitchi.library.dto.LoginResponse;
import com.karitchi.library.service.AuthService;
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

  // Inner class for error response
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
