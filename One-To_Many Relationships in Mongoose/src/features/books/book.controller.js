import BookRepository from "./book.repository.js";


export default class BookController {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  createBook = async (req, res) => {
    const { title, author, genre, copies, availableCopies, reviews } = req.body;
    try {
      const bookData = {
        title,
        author,
        genre,
        copies,
        availableCopies,
        reviews,
      };

      const savedBook = await this.bookRepository.createBook(bookData);
      res.status(201).json(savedBook);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create a new book" });
    }
  };

  addReviewToBook = async (req, res) => {

    const { bookId } = req.params;
    const { text, rating } = req.body;

    try {
      const book = await this.bookRepository.getOne(bookId);
      if (!book) {
        res.status(404).send("book  not found.");
      } else {
        const review = await this.bookRepository.addReviewToBook(bookId, text, rating);
        res.status(200).json(review);
      }


    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Falied to add review" });
    }


  }

  getOne = async (req, res) => {
    const { bookId } = req.params;
    console.log(bookId);

    try {
      const book = await this.bookRepository.getOne(bookId);
      if (!book) {
        res.status(404).send("book  not found.");
      } else {
        res.status(200).send(book);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to find book" });
    }
  };

  listBooksByGenre = async (req, res) => {
    const { genre } = req.params;

    try {
      const book = await this.bookRepository.listBooksByGenre(genre);
      if (!book) {
        res.status(404).send("book not found!!");
      } else {
        res.status(200).send(book);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Can't filter by Genre" });
    }
  };

  updateBookAvailability = async (req, res) => {
    const { bookId } = req.params;
    const { quantity } = req.body;
    // console.log(bookId + " " + quantity);
    try {
      const updatedBook = await this.bookRepository.updateBookAvailability(
        bookId,
        quantity
      );
      if (!updatedBook) {
        res.status(404).json("book not found!!");
      } else {
        res.status(200).json(updatedBook);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Could not update quantity" });
    }
  };

  deleteBook = async (req, res) => {
    const { bookId } = req.params;

    try {
      const deletedBook = await this.bookRepository.deleteBookById(bookId);
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book deleted" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete book" });
    }
  };
}
