const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/mongoose");
const user = require("./models/user");
const Task = require("./models/task");

app.use(express.json());
// app.post("/tasks", (req, res) => {
//integrating async await
//app.post("/tasks", (req, res) => {
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  // task
  //   .save()
  //   .then(() => {
  //     res.send(task);
  //    })
  //   .catch((e) => {
  //     res.status(400);
  //     res.send(e);
  //   });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
//creating record////////////
app.post("/users", async (req, res) => {
  const user1 = new user(req.body);
  try {
    await user1.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////////Reading record//////////
//integrating async await
//app.get("/users", (req, res) => {
app.get("/users", (req, res) => {
  user
    .find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
});
/////////reading tasks///////////
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
});
///GETTING BY ID
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  user
    .findById(_id)
    .then((taskname) => {
      if (!taskname) res.status(404);
      res.send(taskname);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

app.get("/users/:id", () => {});

app.listen(port, () => {
  console.log("App listening on the port", port);
});
