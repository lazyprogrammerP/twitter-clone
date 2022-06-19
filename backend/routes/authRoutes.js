const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/sign-up", async (req, res) => {
  const data = req.body;
  const { firstName, lastName, username, email, password } = data;

  if (
    firstName &&
    lastName &&
    email &&
    username &&
    firstName.trim() &&
    lastName.trim() &&
    username.trim() &&
    email.trim()
  ) {
    const _user = await UserModel.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((error) => {
      console.log(error);

      res.status(500).json({
        message: "Something went wrong.",
      });
    });

    if (!_user) {
      // User not found
      data.password = await bcrypt.hash(password, 10);
      let user = await UserModel.create(data).catch((error) => {
        console.log(error);

        res.status(500).json({
          message: "Something went wrong.",
        });
      });

      user = user.toObject();

      req.session.user = user;
      delete user.password;
      res.status(200).json({
        ...user,
      });

      return;
    }

    // User found
    if (_user.username === username) {
      res.status(409).json({
        message: "Username already in use.",
      });

      return;
    }

    res.status(409).json({
      message: "Email already in use.",
    });

    return;
  }

  res.status(400).json({
    message: "Please make sure each field has an valid value.",
  });
});

router.post("/sign-in", async (req, res) => {
  const data = req.body;
  const { email, password } = data;

  if (email && password && email.trim()) {
    let user = await UserModel.findOne({
      $or: [{ username: email }, { email: email }],
    }).catch((error) => {
      console.log(error);

      res.status(500).json({
        message: "Something went wrong.",
      });
    });

    user = user.toObject();

    if (user) {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        req.session.user = user;
        delete user.password;
        res.status(200).json({
          ...user,
        });

        return;
      }

      res.status(400).json({
        message: "Incorrect credentials.",
      });
    }

    return;
  }

  res.status(400).json({
    message: "Please make sure each field has an valid value.",
  });
});

module.exports = router;
