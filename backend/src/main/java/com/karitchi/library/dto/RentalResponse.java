package com.karitchi.library.dto;

import java.time.LocalDate;

public class RentalResponse {
  private Long id;
  private Long userId;
  private String userEmail;
  private Long bookId;
  private String bookTitle;
  private String bookAuthor;
  private LocalDate rentDate;
  private LocalDate dueDate;
  private String status;

  public RentalResponse(Long id, Long userId, String userEmail, Long bookId,
      String bookTitle, String bookAuthor, LocalDate rentDate,
      LocalDate dueDate, String status) {
    this.id = id;
    this.userId = userId;
    this.userEmail = userEmail;
    this.bookId = bookId;
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.rentDate = rentDate;
    this.dueDate = dueDate;
    this.status = status;
  }

  public Long getId() { return id; }
  public Long getUserId() { return userId; }
  public String getUserEmail() { return userEmail; }
  public Long getBookId() { return bookId; }
  public String getBookTitle() { return bookTitle; }
  public String getBookAuthor() { return bookAuthor; }
  public LocalDate getRentDate() { return rentDate; }
  public LocalDate getDueDate() { return dueDate; }
  public String getStatus() { return status; }
}
