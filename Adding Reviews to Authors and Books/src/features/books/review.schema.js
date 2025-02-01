// make necessary imports here
import mongoose from "mongoose"

// write your code here
export const reviewSchema = new mongoose.Schema({
  text: {
    required: true,
    type: String
  },
  rating: {
    required: true,
    type: Number,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "Rating must be an integer between 1 and 5",
    },
  },
  target: {
    type: String,
    enum: ["Author", "Book"]
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "target",
  }

})
