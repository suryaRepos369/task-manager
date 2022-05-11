const mongoose = require("mongoose");
const validator = require("validator");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager", {
  useNewUrlParser: true,
  //useCreateIndex: true,
});

// const me = new user({
//   name: "CafeCoffe",
//   age: 45,
//   password: "suryap",
//   email: "suryaoff369@gmail.com",
// });
// me.save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// new task model

// const Task = mongoose.model("tasks", {
//   taskname: { type: String, required: true },
//   status: { type: Boolean, default: false },
// });

// const task = new Task({ taskname: "complete the big fish", status: true });
// task
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
