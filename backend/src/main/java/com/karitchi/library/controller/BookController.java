package com.karitchi.library.controller;

import com.karitchi.library.dto.BookPageResponse;
import com.karitchi.library.model.Book;
import com.karitchi.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
public class BookController {

  @Autowired
  private BookService bookService;

  @GetMapping
  public BookPageResponse getAllBooks(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(required = false) String search
  ) {
    return bookService.getAllBooks(page, size, search);
  }

  @GetMapping("/{id}")
  public Book getBookById(@PathVariable Long id) {
    return bookService.getBookById(id);
  }

}
