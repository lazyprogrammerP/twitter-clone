const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pinned: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    retweetData: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    retweetedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
