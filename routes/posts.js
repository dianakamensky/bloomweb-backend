const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost
} = require("../controllers/posts");



router.get("/", getPosts);

router.get("/:postId", getPost);



module.exports = router;
