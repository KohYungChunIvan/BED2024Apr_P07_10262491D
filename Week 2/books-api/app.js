// Part 2
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
];

// Using a middleware
// parse incoming JSON data in requests
app.use(express.json()) 

// Configure body-parser to handle URL-encoded form data
app.use(bodyParser.urlencoded({extended: true })); // Set extended

app.get('/books', (req, res) =>{
    res.json(books); // Send the array of books as JSON response
});


// Part 3
app.post('/books', (req, res) => {
    const newBook = req.body; // Get the new book data from the request body / Access data from request body
    newBook.id = books.length + 1; // Assign a unique ID
    books.push(newBook); // Add the new book to the array
    res.status(201).json(newBook); // Send created book with status code 201
});

app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL param
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.json(book); // Send the book data if found
    } else {
        res.status(404).send('Book not found'); // Send error for non-exist
    }
});

app.put('/books/:id', (req, res) =>{
    const booksId = parseInt(req.params.id); // Get book ID from URL parameter
    const updatedBook = req.body; // Get updated book data from request body

    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        updatedBook.id = bookId;
        books[bookIndex] = updatedBook; // Update book data in the array
        res.json(updatedBook); // Send updated book data
    } else { 
        res.status(404).send('Book not found'); // Send error for non-existent book
    }
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL param

    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex,  1); // Remove book from the array
        res.status(204).send(); // Send empty response with status code 204
    } else {
        res.status(404).send('Book not found'); // Send error for non-existent book
    }
});