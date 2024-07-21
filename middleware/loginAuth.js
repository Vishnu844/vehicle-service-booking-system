const jwt = require("jsonwebtoken");
require("dotenv").config();

const getTokenFromHeaders = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    return authHeader.split(" ")[1];
  }

  return null;
};

module.exports = (req, res, next) => {
  const authToken = getTokenFromHeaders(req);
  if (!authToken) {
    res.status(200).json({
      status: 0,
      message: "No authentication token found",
      data: null,
    });
  } else {
    jwt.verify(authToken, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        res.status(200).json({
          status: 0,
          message: "Token invalid or expired",
          data: null,
          error: err.message,
        });
      } else {
        req.user = payload;
      }
      next();
    });
  }
};
