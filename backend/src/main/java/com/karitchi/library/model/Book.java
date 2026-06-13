package com.karitchi.library.model;

public class Book {
    private String id;
    private String title;
    private String author;
    private String description;
    private Integer publishedYear;
    private String genre;
    private Integer pages;
    private Double rating;
    private Boolean inStock;
    private Double price;
    private String isbn;

    // Constructors
    public Book() {}

    public Book(String id, String title, String author, Integer publishedYear, String genre) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genre = genre;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getPublishedYear() { return publishedYear; }
    public void setPublishedYear(Integer publishedYear) { this.publishedYear = publishedYear; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public Integer getPages() { return pages; }
    public void setPages(Integer pages) { this.pages = pages; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Boolean getInStock() { return inStock; }
    public void setInStock(Boolean inStock) { this.inStock = inStock; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
}
