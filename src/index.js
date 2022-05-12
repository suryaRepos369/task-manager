const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/mongoose");
const bcrypt = require("bcryptjs");

///routes for the tasks  users
const taskRouter = require("../src/routers/tasks");
const userRouter = require("../src/routers/users");

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);


app.listen(port, () => {
  console.log("App listening on the port", port);
});
