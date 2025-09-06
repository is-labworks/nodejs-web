const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
    required: [true, "Comment body is required."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Articles'
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;