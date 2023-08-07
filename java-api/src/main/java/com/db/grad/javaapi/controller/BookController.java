package com.db.grad.javaapi.controller;


import com.db.grad.javaapi.Service.BookService;
import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//@RequestMapping("/api/v1")
//@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/books/{id}")
    public ResponseEntity < Book > getBookById(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        Book books = bookService.getBookById(id);
        return ResponseEntity.ok().body(books);
    }

    @GetMapping("/books/userID")
    public ResponseEntity < List<Book> > getAllBooksByUserId(@RequestParam long id)
            throws ResourceNotFoundException {
        List<Book> books = bookService.getAllBooksByUserID(id);
        return ResponseEntity.ok().body(books);
    }

    @PostMapping("/books")
    public Book createBook(@Valid @RequestBody Book book) {
        return bookService.addBook(book);
    }

    @PutMapping("/books/{id}")
    public ResponseEntity < Book > updateBook(@PathVariable(value = "id") Long id,
                                            @Valid @RequestBody Book bookDetails) throws ResourceNotFoundException {

        final Book updatedBooks = bookService.updateBookDetails(bookDetails);
        return ResponseEntity.ok(updatedBooks);
    }

    @DeleteMapping("/books/{id}")
    public Map< String, Boolean > deleteBook(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        boolean removed = bookService.removeBook(id);

        Map < String, Boolean > response = new HashMap<>();
        if( removed )
            response.put("deleted", Boolean.TRUE);
        else
            response.put("deleted", Boolean.FALSE);
        return response;
    }
}
