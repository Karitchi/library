package com.karitchi.library.dto;

import java.time.LocalDateTime;

public class UserResponse {
  private Long id;
  private String email;
  private String role;
  private LocalDateTime createdAt;

  public UserResponse(Long id, String email, String role, LocalDateTime createdAt) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }

  // Getters
  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getRole() {
    return role;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
}
