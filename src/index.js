const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/mongoose");
const bcrypt = require("bcryptjs");
///routes for the tasks  users
const taskRouter = require("../src/routers/tasks");
const userRouter = require("../src/routers/users");
const e = require("express");
//using express middleware
// app.use((req, res, next) => {
//   // if (req.method == "GET") {
//   //   res.send("GET requests are disabled for the moment" + req.path);
//   // } else next();
//   res.status(503).send("site under maintenance");
// });

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log("App listening on the port", port);
});
