const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} = require("../utils/errors");

function getPosts(req, res, next) {
  Post.find(req.query)
    .then((data) => res.send({ data }))
    .catch(next);
}

function deletePost(req, res, next) {
  Post.findById(req.params.postId)
    .select("owner")
    .orFail(new NotFoundError("Post not found"))
    .then((post) => {
      if (post.owner._id.toString() === req.user._id.toString()) {
        Post.deleteOne({ _id: post._id }).then((data) => res.send({ data }));
      } else {
        throw new ForbiddenError("Post was not created by user");
      }
    })
    .catch(next);
}

function createPost(req, res, next) {
  const { flower, date, location, image } = req.body;
  Post.create({
    flower,
    date,
    location,
    image,
    owner: req.user._id,
  })
    .then((post) =>
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { posts: post._id } },
        { new: true, runValidators: true }
      )
    )
    .then((data) => res.send({ data }))
    .catch(next);
}

function getPost(req, res, next) {
  Post.findById(req.params.postId)
  .populate("comments")
    .then((data) => res.send({ data }))
    .catch(next);
}

async function createComment(req, res, next) {
  const { comment } = req.body;
  const owner = req.user._id;
  try {
    const data = await Comment.create({ content: comment, owner });
    await Post.findByIdAndUpdate(
      req.params.postId,
      { $push: { comments: data._id } },
      { new: true, runValidators: true }
    ).orFail(new NotFoundError("Post not found"));
    res.send({ data });
  } catch(error) {
    next(error);
  }
}

module.exports = {
  deletePost,
  createPost,
  getPosts,
  getPost,
  createComment,
};
