const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  flower: {
    type: String
  },
  ownerId: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User"
  },
  comments: [{type: mongoose.ObjectId, ref: "Comment"}]
});

module.exports = mongoose.model("Post", postSchema);
