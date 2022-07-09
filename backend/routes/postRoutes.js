const express = require("express");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const router = express.Router();

router.get("/", async (req, res) => {
  const postsPerPage = 15;
  const page = req.query.page || 0;

  let posts = await PostModel.find()
    .skip(page * postsPerPage)
    .limit(postsPerPage)
    .populate("postedBy", "-password")
    .sort({ updatedAt: -1 })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        message: "Something went wrong.",
      });
    });

  res.status(200).json(posts);
});

router.post("/", async (req, res) => {
  console.log(req.user);

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

module.exports = router;
