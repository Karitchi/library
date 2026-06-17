package com.karitchi.library.repository;

import com.karitchi.library.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
  List<Rental> findByUserId(Long userId);
}
