package com.karitchi.library.controller;

import com.karitchi.library.dto.RentalRequest;
import com.karitchi.library.dto.RentalResponse;
import com.karitchi.library.service.RentalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

  @Autowired
  private RentalService rentalService;

  @GetMapping
  public ResponseEntity<?> getRentals(Authentication authentication) {
    try {
      String email = authentication.getName();
      return ResponseEntity.ok(rentalService.getRentalsByUser(email));
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }
  }

  @GetMapping("/all")
  public ResponseEntity<?> getAllRentals() {
    try {
      return ResponseEntity.ok(rentalService.getAllRentals());
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }
  }

  @PutMapping("/{id}/return")
  public ResponseEntity<?> returnRental(@PathVariable Long id) {
    try {
      RentalResponse response = rentalService.returnRental(id);
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }
  }

  @PostMapping
  public ResponseEntity<?> rentBook(@Valid @RequestBody RentalRequest request,
      Authentication authentication) {
    try {
      String email = authentication.getName();
      RentalResponse response = rentalService.rentBook(email, request.getBookId(), request.getDueDate());
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }
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
