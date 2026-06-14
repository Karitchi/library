package com.karitchi.library.service;

import com.karitchi.library.model.Test;
import com.karitchi.library.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TestService {

  @Autowired
  private TestRepository testRepository;

  public List<Test> getAllTests() {
    List<Test> tests = testRepository.findAll();

    // Log to console
    System.out.println("=== All records from 'test' table ===");
    for (Test test : tests) {
      System.out.println(test);
    }
    System.out.println("Total records: " + tests.size());

    return tests;
  }
}
