import mongoose from 'mongoose';

export const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    // Reference to the book this review is associated with
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Refers to the 'Book' model
    },
});