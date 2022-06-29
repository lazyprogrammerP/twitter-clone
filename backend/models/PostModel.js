const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
