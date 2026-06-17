package com.karitchi.library.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class RentalRequest {

  @NotNull(message = "Book ID is required")
  private Long bookId;

  private LocalDate dueDate;

  public Long getBookId() {
    return bookId;
  }

  public void setBookId(Long bookId) {
    this.bookId = bookId;
  }

  public LocalDate getDueDate() {
    return dueDate;
  }

  public void setDueDate(LocalDate dueDate) {
    this.dueDate = dueDate;
  }
}
