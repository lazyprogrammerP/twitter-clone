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
    .populate("retweetData")
    .sort({ createdAt: -1 })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        message: "Something went wrong.",
      });
    });

  posts = await UserModel.populate(posts, { path: "retweetData.postedBy", select: "-password" });

  res.status(200).json({ posts, maxPage });
});

router.post("/", async (req, res) => {
  if (!req.body || !req.body.content) {
    res.status(400).json({
      message: "The post content cannot be empty.",
    });

    return;
  }

  const postData = { content: req.body.content, postedBy: req.user };

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
  user = await UserModel.findByIdAndUpdate(userId, { [updateOption]: { likedPosts: postId } }, { new: true }).catch((error) => {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  });

  user = user.toObject();
  delete user.password;

  // Inserting / Removing likes from the post model.
  let post = await PostModel.findByIdAndUpdate(postId, { [updateOption]: { likes: userId } }, { new: true }).catch((error) => {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  });

  post = await UserModel.populate(post, { path: "postedBy", select: "-password" });

  res.setHeader("Access-Control-Expose-Headers", "x-auth-token").setHeader("x-auth-token", jwt.sign(user, "potatoman")).status(200).json(post);
});

router.post("/:postId/retweet", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  let user = req.user;
  const isDeleted = await PostModel.findOneAndDelete({ postedBy: userId, retweetData: postId }).catch((error) => {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  });

  const option = isDeleted !== null ? "$pull" : "$addToSet";

  let post = isDeleted;
  if (isDeleted === null) {
    // Post didn't already exist.
    post = await PostModel.create({ postedBy: userId, retweetData: postId }).catch((error) => {
      console.log(error);

      return res.status(500).json({
        message: "Something went wrong.",
      });
    });
  }

  // Add / Remove the post from the user's retweetedPosts
  user = await UserModel.findByIdAndUpdate(userId, { [option]: { retweetedPosts: post._id } }, { new: true }).catch((error) => {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  });

  user = user.toObject();
  delete user.password;

  // Add / Remove the user from original posts retweetedBy array
  let originalPost = await PostModel.findByIdAndUpdate(postId, { [option]: { retweetedBy: userId } }, { new: true })
    .populate("postedBy", "-password")
    .populate("retweetData")
    .catch((error) => {
      console.log(error);

      return res.status(500).json({
        message: "Something went wrong.",
      });
    });
  originalPost = originalPost.toObject();
  originalPost = await UserModel.populate(originalPost, { path: "retweetData.postedBy", select: "-password" });

  res.setHeader("Access-Control-Expose-Headers", "x-auth-token").setHeader("x-auth-token", jwt.sign(user, "potatoman")).status(200).json(originalPost);
});

module.exports = router;
