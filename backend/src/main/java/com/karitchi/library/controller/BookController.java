package com.karitchi.library.controller;

import com.karitchi.library.dto.BooksResponse;
import com.karitchi.library.model.Book;
import com.karitchi.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow your React frontend to call this API
public class BookController {

    @Autowired
    private BookService bookService;

    // Endpoint to get all books (matches your React frontend needs)
    @GetMapping("/books")
    public ResponseEntity<BooksResponse> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        BooksResponse response = new BooksResponse(true, books, "Books retrieved successfully", 200);
        return ResponseEntity.ok(response);
    }

    // Endpoint to get a single book by ID
    @GetMapping("/books/{id}")
    public ResponseEntity<?> getBookById(@PathVariable String id) {
        Book book = bookService.getBookById(id);
        if (book != null) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new BooksResponse(false, null, "Book not found", 404));
        }
    }

    // Simple endpoint that returns just the books array (simpler structure)
    @GetMapping("/books/simple")
    public ResponseEntity<List<Book>> getBooksSimple() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }
}
