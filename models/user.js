const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 25,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  bio: {
    type: String,
    maxLength: 200,
  },
  pfp: {
    type: String,
  },
  savedPosts: [{ type: mongoose.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("User", userSchema);