### Title:

One-to-Many Relationship in Mongoose

## Introduction + Scenario:

You are tasked with enhancing a Books API application by adding a new feature that allows users to add reviews to books. The application already has schemas and controllers for books and reviews. Your goal is to complete the implementation of the review feature, ensuring that reviews are associated with the correct books using Mongoose's one-to-many relationship.

## Objectives:

1. Implement the Mongoose schema for reviews('features/books/review.schema.js), named reviewSchema, with the following properties:

- text: A required string field for the review text.
- rating: A required number field for the review rating, with a minimum value of 1 and a maximum value of 5.
- book: A reference field (ObjectId) that associates each review with a book using Mongoose's one-to-many relationship, with a reference to the 'Book' model.

2. Update the bookSchema to include a 'reviews' field, which should be an array of ObjectId references to reviews, thus establishing a one-to-many relationship between books and reviews.
3. Implement the 'addReviewToBook' method in the BookRepository class to add reviews to specific books.
4. Utilize the addReviewToBook function in the BookController to handle the addition of reviews to books.
5. Validate and return a 404 status code if the book with the given bookId does not exist.
6. Validate and return a 201 status code upon successfully adding a review to a book. For further details, please refer to the provided video link under '# Expected Output'.

## Expected Output:

Video Link: https://files.codingninjas.in/final_16_1-31335.mp4

## Notes/Hints:

1. You can use the POST route "http://localhost:3000/api/books" to create a new book document with the provided sample data:
   {
   "title": "Harry Potter",
   "author": "J.K. Rowling",
   "genre": "Fantasy",
   "copies": 8,
   "availableCopies": 20
   }
2. Test the functionality using Postman or a similar tool to ensure it works as expected.
