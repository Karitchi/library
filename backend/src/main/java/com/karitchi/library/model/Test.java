package com.karitchi.library.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "test")
public class Test {

  @Id
  @Column(name = "message")
  private String message;

  // Default constructor
  public Test() {
  }

  // Constructor with fields
  public Test(String message) {
    this.message = message;
  }

  // Getter and Setter
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  @Override
  public String toString() {
    return "Test{message='" + message + "'}";
  }
}
