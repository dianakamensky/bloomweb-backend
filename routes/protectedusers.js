const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  savePost,
  unsavePost,
  getSavedPosts,
  getUserPosts,
} = require("../controllers/users");

router.get("/profile", getUser);

router.patch("/profile", updateUser);

router.put("/save/:postId", savePost);

router.delete("/save/:postId", unsavePost);

router.get("/profile/saved", getSavedPosts);

router.get("/profile/posts", getUserPosts)

module.exports = router;