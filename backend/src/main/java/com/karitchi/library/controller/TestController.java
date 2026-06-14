package com.karitchi.library.controller;

import com.karitchi.library.model.Test;
import com.karitchi.library.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {

  @Autowired
  private TestService testService;

  @GetMapping
  public List<Test> getAllTests() {
    return testService.getAllTests();
  }
}
