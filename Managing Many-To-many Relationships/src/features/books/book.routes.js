import express from "express";
const router = express.Router();
import BookController from "./book.controller.js";

const booksController = new BookController();

// Create a New Book
router.post("/", (req, res) => {
  booksController.createBook(req, res);
});

router.post("/:bookId/reviews", (req, res) => {
  booksController.addReviewToBook(req, res);
})

// Get Book Details by ID
router.get("/:bookId", (req, res) => {
  booksController.getOne(req, res);
});

// Update Book Availability
router.put("/:bookId", (req, res) => {
  booksController.updateBookAvailability(req, res);
});

// Delete Book by ID
router.delete("/:bookId", (req, res) => {
  booksController.deleteBook(req, res);
});

// List Books by Genre
router.get("/genre/:genre", (req, res) => {
  booksController.listBooksByGenre(req, res);
});

// Create a New Author
router.post("/authors", (req, res) => {
  booksController.createAuthor(req, res);
});

// Associate an Author with a Book
router.post("/:bookId/authors", (req, res) => {
  booksController.addAuthorToBook(req, res);
});

// List Authors of a Book
router.get("/:bookId/authors", (req, res) => {
  booksController.listAuthorsByBook(req, res);
});

// List Books by an Author
router.get("/authors/:authorId/books", (req, res) => {
  booksController.listBooksByAuthor(req, res);
});

export default router;
