package com.karitchi.library.dto;

import com.karitchi.library.model.Book;
import java.util.List;

public class BooksResponse {
    private boolean success;
    private List<Book> data;
    private String message;
    private Integer statusCode;

    public BooksResponse(boolean success, List<Book> data, String message, Integer statusCode) {
        this.success = success;
        this.data = data;  
        this.message = message;
        this.statusCode = statusCode;
    }

    // Getters and Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public List<Book> getData() { return data; }  
    public void setData(List<Book> data) { this.data = data; }  

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Integer getStatusCode() { return statusCode; }
    public void setStatusCode(Integer statusCode) { this.statusCode = statusCode; }
}
