const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/users");

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // ! Get Token from the headers
      token = req.headers.authorization.split(" ")[1];

      // !  verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ! get User form the token
      req.user = await Users.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error(err.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protectRoute;
