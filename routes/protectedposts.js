const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
  createComment,
} = require("../controllers/posts");

router.delete("/:postId", deletePost);

router.post("/:postId/comments", createComment);

router.post("/", createPost);



module.exports = router;