package com.karitchi.library.controller;

import com.karitchi.library.model.Book;
import com.karitchi.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

  @Autowired
  private BookService bookService;

  // GET endpoint to return all books
  @GetMapping
  public List<Book> getAllBooks() {
    return bookService.getAllBooks();
  }

  // Optional: GET endpoint for a single book by ID
  @GetMapping("/{id}")
  public Book getBookById(@PathVariable Long id) {
    return bookService.getBookById(id);
  }

  // Optional: POST endpoint to add a new book
  @PostMapping
  public Book addBook(@RequestBody Book book) {
    return bookService.addBook(book);
  }

}
