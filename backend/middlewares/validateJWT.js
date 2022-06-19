const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  if (req.headers && req.headers["x-auth-token"]) {
    try {
      let user = jwt.verify(req.headers["x-auth-token"], "potatoman");
      req.user = user;
    } catch {
      res.status(401).json({
        message: "Invalid token.",
      });

      return;
    }

    return next();
  }

  res.status(401).json({
    message: "Token not found.",
  });
};

module.exports = validateJWT;
