const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUser
} = require("../controllers/users");

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/user/:id", getUser);

module.exports = router;
