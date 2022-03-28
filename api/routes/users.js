const express = require("express");
const { register, login, getMe } = require("../controllers/users");
const protectRoute = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protectRoute, getMe);

module.exports = router;
