const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    text: {
      type: String,
      required: [true, "Please Add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todos", todoSchema);
