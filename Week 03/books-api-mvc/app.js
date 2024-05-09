const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController"); // Import controllers
const validateBook = require("./middlewares/validateBook");

const app = express();

app.use(bodyParser.json()); // Parse incoming JSON data in request body
// This middleware intercepts incoming requests and parses any JSON data in the request body. This allows us to access book data sent in the body of POST, PUT, and PATCH requests from clients like Postman.

app.use(bodyParser.urlencoded({ extended: true })); // For form data handling


app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook);
app.put("/books/:id", validateBook, booksController.updateBook);
app.delete("/books/:id", booksController.deleteBook);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
