const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User"
  },
  content: {
    type: String,
    required: true,
    maxlength: 200
  }
});

module.exports = mongoose.model("Comment", commentSchema);
