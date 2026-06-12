package com.karitchi.library.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    // GET with query parameters: /api/authors?country=USA
    @GetMapping
    public String getAuthors(@RequestParam(required = false) String country) {
        if (country != null) {
            return "Authors from " + country;
        }
        return "All authors";
    }
    
    // GET with path variable: /api/authors/1
    @GetMapping("/{authorId}")
    public String getAuthor(@PathVariable Long authorId) {
        return "Author ID: " + authorId;
    }
    
    // POST with JSON object
    @PostMapping
    public Map<String, String> createAuthor(@RequestBody Map<String, String> author) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Created author: " + author.get("name"));
        response.put("status", "success");
        return response;  // Spring automatically converts Map to JSON
    }
}
