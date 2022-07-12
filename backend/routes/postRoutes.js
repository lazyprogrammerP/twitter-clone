const express = require("express");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const postsPerPage = 15;
  const page = req.query.page || 0;

  const totalPosts = await PostModel.collection.countDocuments();
  const maxPage = totalPosts / postsPerPage > Math.floor(totalPosts / postsPerPage) ? Math.floor(totalPosts / postsPerPage) + 1 : totalPosts / postsPerPage;

  let posts = await PostModel.find()
    .skip(page * postsPerPage)
    .limit(postsPerPage)
    .populate("postedBy", "-password")
    .sort({ createdAt: -1 })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        message: "Something went wrong.",
      });
    });

  res.status(200).json({ posts, maxPage });
});

router.post("/", async (req, res) => {
  if (!req.body || !req.body.content) {
    res.status(400).json({
      message: "The post content cannot be empty.",
    });

    return;
  }

  const postData = {
    content: req.body.content,
    postedBy: req.user,
  };

  let post = await PostModel.create(postData).catch((err) => {
    console.log(err);

    res.status(500).json({
      message: "Something went wrong.",
    });
  });

  post = post.toObject();

  post = await UserModel.populate(post, { path: "postedBy", select: "-password" });

  res.status(200).json(post);
});

router.put("/:postId/like", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  let user = req.user;
  const isLiked = user.likedPosts && user.likedPosts.includes(postId);

  const updateOption = isLiked ? "$pull" : "$addToSet";

  // Inserting / Removing liked posts from the user model.
  user = await UserModel.findByIdAndUpdate(
    userId,
    {
      [updateOption]: {
        likedPosts: postId,
      },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  });
  user = user.toObject();

  // Inserting / Removing likes from the post model.
  let post = await PostModel.findByIdAndUpdate(
    postId,
    {
      [updateOption]: {
        likes: userId,
      },
    },
    { new: true }
  ).catch((error) => {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  });

  post = await UserModel.populate(post, { path: "postedBy", select: "-password" });

  res.setHeader("Access-Control-Expose-Headers", "x-auth-token").setHeader("x-auth-token", jwt.sign(user, "potatoman")).status(200).json(post);
});

module.exports = router;
