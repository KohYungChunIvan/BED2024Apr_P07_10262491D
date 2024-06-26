async function fetchBooks() {
    const response = await fetch("/books");
    const data = await response.json();

    const bookList = document.getElementById("book-list");

    data.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book"); // Add a CSS class for styling

        // Create elements for title, author, etc. and populate with book data
        const titleElement = document.createElement("h2");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = `By: ${book.author}`;

        const idElement = document.createElement("p");
        idElement.textContent = `ID: ${book.id}`;

        bookItem.appendChild(titleElement);
        bookItem.appendChild(authorElement);
        bookItem.appendChild(idElement);

        bookList.appendChild(bookItem);
    });

}

fetchBooks(); // Call the function to fetch and display book data