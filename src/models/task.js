const mongoose = require("mongoose");
const validator = require("validator");

const Task = new mongoose.model("tasks", {
  taskname: {
    type: String,
  },
  status: { type: Boolean },
});

module.exports = Task;
