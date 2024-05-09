const { request } = require("express");
const dbConfig = require("../dbConfig");
const sql = require("mssql");

class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }

    static async getAllBooks() {
        const connection = await sql.connect(dbConfig);
        
        const sqlQuery = `Select * FROM Books`; 

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
            (row) => new Book(row.id, row.title, row.author)
        );
    }

    static async getBookById(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Books WHERE id = @id`; //Parameter

        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0]
        ? new Book(
            result.recordset[0].id,
            result.recordset[0].title,
            result.recordset[0].author
            )
        : null; // Handle book not found
    }

    static async createBook(newBookData) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `INSERT INTO Books (title, author) VALUES (@title, @author); SELECT SCOPE_IDENTITY() AS id;`;
        request.input("title", newBookData.title);
        request.input("author", newBookData.author);

        const result = await request.query(sqlQuery);
        
        connection.close();
        
        return this.getBookById(result.recordset[0].id)
    }

    static async updateBook(id, newBookData) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `UPDATE Books SET title = @title, author = @author WHERE id = @id`;

        const request = connection.request();
        request.input("id", id);
        request.input("title", newBookData.title || null);
    }
}

module.exports = Book;