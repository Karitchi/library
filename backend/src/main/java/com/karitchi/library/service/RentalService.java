package com.karitchi.library.service;

import com.karitchi.library.dto.RentalResponse;
import com.karitchi.library.model.Book;
import com.karitchi.library.model.Rental;
import com.karitchi.library.model.User;
import com.karitchi.library.repository.BookRepository;
import com.karitchi.library.repository.RentalRepository;
import com.karitchi.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class RentalService {

  @Autowired
  private RentalRepository rentalRepository;

  @Autowired
  private BookRepository bookRepository;

  @Autowired
  private UserRepository userRepository;

  @Transactional
  public RentalResponse rentBook(String email, Long bookId, LocalDate dueDate) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    Book book = bookRepository.findById(bookId)
        .orElseThrow(() -> new RuntimeException("Book not found"));

    if (book.getAvailableQuantity() <= 0) {
      throw new RuntimeException("No available copies");
    }

    book.setAvailableQuantity(book.getAvailableQuantity() - 1);
    bookRepository.save(book);

    Rental rental = new Rental();
    rental.setUser(user);
    rental.setBook(book);
    rental.setDueDate(dueDate != null ? dueDate : LocalDate.now().plusDays(14));
    rental.setRentDate(LocalDate.now());
    rental.setStatus("active");

    Rental saved = rentalRepository.save(rental);

    return new RentalResponse(
        saved.getId(), user.getId(), user.getEmail(),
        book.getId(), book.getTitle(), book.getAuthor(),
        saved.getRentDate(), saved.getDueDate(), saved.getStatus());
  }
}
