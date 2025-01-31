// Please don't change the pre-written code
// Import the necessary modules here(if required)

import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
  // Write your code here
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  }
});
