const asyncHandler = require("express-async-handler");
const Todos = require("../models/todos");
const Users = require("../models/users");

// @desc get todos
// @route GET /api/todos
// @access Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todos.find({ user: req.user.id });
  res.status(200).send(todos);
});

// @desc create todo
// @route POST /api/todos/create
// @access Private
const createTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please add a body request");
  }
  const todo = await Todos.create({
    text,
    user: req.user.id,
  });
  res.status(201).send(todo);
});

// @desc update todo
// @route PUT /api/todos/update/:id
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todos.findById(id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not Found");
  }

  const user = await Users.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // Check if user is owner of todo
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error(
      "Not authorized to Update this todo, your are not the owner"
    );
  }

  const updatedTodo = await Todos.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).send(updatedTodo);
});

// @desc get todos
// @route DELETE /api/todos/delete/:id
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todos.findById(id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not Found");
  }

  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // Check if user is owner of todo
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "Not authorized to Update this todo, your are not the owner"
    );
  }

  const deletedTodo = await Todos.findByIdAndDelete(id);
  res.status(200).send(deletedTodo._id);
});

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
