package com.karitchi.library.service;

import com.karitchi.library.model.Book;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class BookService {
    
    public List<Book> getAllBooks() {
        return Arrays.asList(
            createBook("book-001", "The Midnight Library", "Matt Haig", 
                       2020, "Fiction", 304, 4.2, 14.99, true,
                       "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right."),
            
            createBook("book-002", "Project Hail Mary", "Andy Weir", 
                       2021, "Science Fiction", 496, 4.7, 16.99, true,
                       "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish."),
            
            createBook("book-003", "The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", 
                       2017, "Historical Fiction", 400, 4.5, 13.99, true,
                       "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life."),
            
            createBook("book-004", "Dune", "Frank Herbert", 
                       1965, "Science Fiction", 896, 4.8, 18.99, true,
                       "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Maud'dib."),
            
            createBook("book-005", "Pride and Prejudice", "Jane Austen", 
                       1813, "Classic", 432, 4.6, 9.99, true,
                       "The story follows the main character Elizabeth Bennet as she deals with issues of manners, upbringing, morality, education, and marriage.")
        );
    }
    
    public Book getBookById(String id) {
        return getAllBooks().stream()
                .filter(book -> book.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
    
    private Book createBook(String id, String title, String author, int year, 
                           String genre, int pages, double rating, double price, 
                           boolean inStock, String description) {
        Book book = new Book();
        book.setId(id);
        book.setTitle(title);
        book.setAuthor(author);
        book.setPublishedYear(year);
        book.setGenre(genre);
        book.setPages(pages);
        book.setRating(rating);
        book.setPrice(price);
        book.setInStock(inStock);
        book.setDescription(description);
        book.setIsbn("978-" + System.currentTimeMillis()); // Fake ISBN
        return book;
    }
}
