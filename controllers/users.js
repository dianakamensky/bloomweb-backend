const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} = require("../utils/errors");
const { createToken } = require("../utils/jwt");

function getUser(req, res, next) {
  User.findById(req.params.id || req.user._id)
    .orFail(new NotFoundError("User not found"))
    .then((data) =>
      res.send({
        username: data.username,
        pfp: data.pfp,
        bio: data.bio,
      })
    )
    .catch(next);
}

function signIn(req, res, next) {
  const { username, password } = req.body;

  User.findOne({ username })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError());
      }
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = createToken(user._id);
            res.send({ token, userId: user._id });
          } else return Promise.reject(new UnauthorizedError());
        })
        .catch(next);
    })
    .catch(next);
}

function signUp(req, res, next) {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ username, password: hash }))
    .then((data) => res.send({ username: data.username }))
    .catch((err) => {
      if (err.name === "MongoServerError" && err.code === 11000) {
        next(new ConflictError("Username already in use"));
      } else next(err);
    });
}

function updateUser(req, res, next) {
  const { username, pfp, bio } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { username, pfp, bio },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("User not found"))
    .then((data) =>
      res.send({ username: data.username, pfp: data.pfp, bio: data.bio })
    )
    .catch((err) => {
      if (err.name === "MongoServerError" && err.code === 11000) {
        next(new ConflictError("Username already in use"));
      } else next(err);
    });
}

function savePost(req, res, next) {
  const { postId } = req.params;
  User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { savedPosts: postId } },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("User not found"))
    .then((data) => res.send({ data }))
    .catch(next);
}

function unsavePost(req, res, next) {
  const { postId } = req.params;
  User.findByIdAndUpdate(
    req.user._id,
    { $pull: { savedPosts: postId } },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("User not found"))
    .then((data) => res.send({ data }))
    .catch(next);
}

function getSavedPosts(req, res, next) {
  User.findById(req.user._id)
    .populate("savedPosts")
    .orFail(new NotFoundError("User not found"))
    .then((data) =>
      res.send({
        savedPosts: data.savedPosts,
      })
    )
    .catch(next);
}

function getUserPosts(req, res, next) {
  User.findById(req.user._id)
    .populate("posts")
    .orFail(new NotFoundError("User not found"))
    .then((data) =>
      res.send({
        posts: data.posts,
      })
    )
    .catch(next);
}

module.exports = {
  signUp,
  signIn,
  updateUser,
  getUser,
  savePost,
  unsavePost,
  getSavedPosts,
  getUserPosts,
};
