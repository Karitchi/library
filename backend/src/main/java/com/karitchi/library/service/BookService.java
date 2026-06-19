package com.karitchi.library.service;

import com.karitchi.library.model.Book;
import com.karitchi.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {

  @Autowired
  private BookRepository bookRepository;

  public List<Book> getAllBooks() {
    List<Book> books = bookRepository.findAll();

    // Log to console (optional)
    System.out.println("📚 Retrieved " + books.size() + " books from database");
    for (Book book : books) {
      System.out.println("  - " + book.getTitle() + " by " + book.getAuthor());
    }

    return books;
  }

  // Optional: Get book by ID
  public Book getBookById(Long id) {
    return bookRepository.findById(id).orElse(null);
  }
}
