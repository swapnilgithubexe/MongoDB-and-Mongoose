// Make necessary imports here.
// Don't change the pre-written code.

import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'
import { reviewSchema } from './review.schema.js';
import { authorSchema } from './author.schema.js';

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

// creating model for review.
const reviewModel = mongoose.model('Review', reviewSchema);

//Author Model
const authorModel = mongoose.model("Authors", authorSchema);


export default class BookRepository {
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    async addReviewToBook(bookId, text, rating) {
        const reviewData = {
            text,
            rating,
            book: new mongoose.Types.ObjectId(bookId)
        }
        const review = new reviewModel(reviewData);
        const savedReview = await review.save();

        const book = await booksModel.findById(bookId);

        book.reviews.push(savedReview._id);

        await book.save();

        return savedReview;

    }

    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    async listBooksByGenre(genre) {
        const books = await booksModel.find({ genre });
        return books;
    }

    async updateBookAvailability(bookId, quantity) {

        console.log(bookId);
        const book = await booksModel.findById(bookId);

        // Calculate the new availableCopies value
        const newAvailableCopies = book.availableCopies + quantity;

        // Update the availableCopies field and save the book
        book.availableCopies = newAvailableCopies;

        await book.save();
        return book;
    }

    async deleteBookById(bookId) {
        const deletedBook = await booksModel.findByIdAndRemove(bookId);
        return deletedBook;
    }

    // Complete the following four funtions.
    async createAuthor(authorData) {
        try {
            const newAuthor = new authorModel(authorData);
            await newAuthor.save();

            return newAuthor;
        } catch (error) {
            console.log("Error while creating an author", error);
            throw new Error(error);

        }
    }

    async addAuthorToBook(bookId, authorId) {
        try {
            const updatedBook = await authorModel.findByIdAndUpdate(authorId, {
                $push: { books: bookId }
            }, { new: true }).populate("books");

            await booksModel.findByIdAndUpdate(bookId, {
                $push: { authors: authorId }
            }, { new: true }).populate("authors");

            return { book: updatedBook.books, author: updatedBook.name };
        } catch (error) {
            console.log("Error while adding the book in authors array.", error);
            throw new Error(error)
        }
    }

    async listAuthorsByBook(bookId) {
        try {
            const authors = await authorModel.find({ books: { $in: [bookId] } }).populate("books");

            return authors;
        } catch (error) {
            throw new Error(`Error fetching authors for book ${bookId}: ${error.message}`);

        }
    }

    async listBooksByAuthor(authorId) {
        try {
            const books = await booksModel.find({
                authors: { $in: [authorId] }
            }).populate("authors");
            return books;
        } catch (error) {
            throw new Error(`Error fetching authors for author ${authorId}: ${error.message}`);

        }
    }
}