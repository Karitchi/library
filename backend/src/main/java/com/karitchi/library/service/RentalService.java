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
import java.util.List;

@Service
public class RentalService {

  @Autowired
  private RentalRepository rentalRepository;

  @Autowired
  private BookRepository bookRepository;

  @Autowired
  private UserRepository userRepository;

  public List<RentalResponse> getAllRentals() {
    return rentalRepository.findAll().stream()
        .map(r -> new RentalResponse(
            r.getId(), r.getUser().getId(), r.getUser().getEmail(),
            r.getBook().getId(), r.getBook().getTitle(), r.getBook().getAuthor(),
            r.getRentDate(), r.getDueDate(), r.getStatus()))
        .toList();
  }

  public List<RentalResponse> getRentalsByUser(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    return rentalRepository.findByUserId(user.getId()).stream()
        .map(r -> new RentalResponse(
            r.getId(), r.getUser().getId(), r.getUser().getEmail(),
            r.getBook().getId(), r.getBook().getTitle(), r.getBook().getAuthor(),
            r.getRentDate(), r.getDueDate(), r.getStatus()))
        .toList();
  }

  @Transactional
  public RentalResponse returnRental(Long rentalId) {
    Rental rental = rentalRepository.findById(rentalId)
        .orElseThrow(() -> new RuntimeException("Rental not found"));

    if (!"active".equals(rental.getStatus())) {
      throw new RuntimeException("Rental is already returned");
    }

    rental.setReturnDate(LocalDate.now());
    rental.setStatus("returned");
    Rental saved = rentalRepository.save(rental);

    Book book = rental.getBook();
    book.setAvailableQuantity(book.getAvailableQuantity() + 1);
    bookRepository.save(book);

    return new RentalResponse(
        saved.getId(), saved.getUser().getId(), saved.getUser().getEmail(),
        book.getId(), book.getTitle(), book.getAuthor(),
        saved.getRentDate(), saved.getDueDate(), saved.getStatus());
  }

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
