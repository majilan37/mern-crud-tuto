const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/users");

// * @desc Register a new user
// * @route POST /api/users/register
// * @access Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide a valid crendentials");
  }

  // check if the user exists
  const checkUser = await Users.findOne({ email });
  if (checkUser) {
    res.status(400);
    throw new Error("a User already exists with that email");
  }

  // hash passowrd
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await Users.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({ ...user._doc, token: generateJWT(user._id) });
  } else {
    res.status(500).send("Something went wrong");
  }
});

// * @desc Authenticate a user
// * @route POST /api/users/login
// * @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check email
  const user = await Users.findOne({ email });
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.status(201).json({
      ...user._doc,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400).send("Invalid email or password");
  }
});

// * @desc Get user's data
// * @route GET /api/users/me
// * @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
function generateJWT(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = {
  register,
  login,
  getMe,
};
