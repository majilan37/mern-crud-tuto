const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos");
const protectRoute = require("../middleware/auth");
const router = express.Router();

router.get("/", protectRoute, getTodos);

router.post("/create", protectRoute, createTodo);

router.put("/update/:id", protectRoute, updateTodo);

router.delete("/delete/:id", protectRoute, deleteTodo);

module.exports = router;
