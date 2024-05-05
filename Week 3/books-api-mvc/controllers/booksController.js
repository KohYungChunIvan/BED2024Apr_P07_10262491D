const Book = require("../models/book");

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.json(books)
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving books"); // Status code 500 is Internal Server Error
    }
};

const getBookById = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const book = await Book.getBookById(bookId);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.json(book);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error retrieving book")
    }
};

const createBook = async (req, res) => {
    const newBook = req.body;
    try {
        const createdBook = await Book.createBook(newBook);
        res.status(201).json(createdBook); // Status code 201 means successfully created
    } catch(error) {
        console.error(error);
        res.status(500).send("Error creating book");
    }
};

const updateBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
    const newBookData = req.body;

    try{
        const updatedBook = await Book.updateBook(bookId, newBookData);
        if (!updatedBook) {
            res.status(404).send("Book not found");
        }
        res.json(updatedBook);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error updating book");
    }
};

const deleteBook = async (req, res) => {
    const bookId = parseInt(req.params.id);

    try{
        const success = await Book.deleteBook(bookId);
        if(!success) {
            res.status(404).send("Book not found");
        }
        res.status(204).send(); // Status code 204 means success with no content
    } catch(error) {
        console.error(error);
        res.status(500).send("Error deleting book");
    }
};

module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
};