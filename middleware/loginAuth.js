const jwt = require("jsonwebtoken");
const User = require("../models/vehicleUser");
require("dotenv").config();

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

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
