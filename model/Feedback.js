const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title cannot be empty!"],
  },
  category: {
    type: String,
    required: [true],
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "suggestion",
    required: [true],
  },
  description: {
    type: String,
    required: [true, "Description cannot be empty!"],
  },
  comments: {
    type: Array,
  },
  plus: {
    type: Boolean,
    default: false,
    required: [true],
  },
  createdBy: {
    type: String,
    default: "random User",
    required: [true],
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
