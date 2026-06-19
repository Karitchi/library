package com.karitchi.library.service;

import com.karitchi.library.dto.BookPageResponse;
import com.karitchi.library.model.Book;
import com.karitchi.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {

  @Autowired
  private BookRepository bookRepository;

  public BookPageResponse getAllBooks(int page, int size, String search) {
    Pageable pageable = PageRequest.of(page, size);
    Page<Book> bookPage;

    if (search != null && !search.isBlank()) {
      bookPage = bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(search, search, pageable);
    } else {
      bookPage = bookRepository.findAll(pageable);
    }

    return new BookPageResponse(
      bookPage.getContent(),
      bookPage.getTotalPages(),
      bookPage.getTotalElements(),
      bookPage.getNumber(),
      bookPage.getSize()
    );
  }

  public Book getBookById(Long id) {
    return bookRepository.findById(id).orElse(null);
  }
}
