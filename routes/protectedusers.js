const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  savePost,
  getSavedPosts,
} = require("../controllers/users");

router.get("/profile", getUser);

router.patch("/profile", updateUser);

router.put("/save/:postId", savePost);

router.get("/profile/saved", getSavedPosts);

module.exports = router;