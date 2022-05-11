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
    const tasks = await task.save();
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});
//creating record////////////
app.post("/users", async (req, res) => {
  const user1 = new user(req.body);
  user1;
  // .save()
  // .then((user) => {
  //   res.status(201).send(user);
  // })
  // .catch((e) => {
  //   res.status(400).send(e);
  // });
  try {
    const user = await user1.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////////Reading record//////////
//integrating async await
//app.get("/users", (req, res) => {
app.get("/users", async (req, res) => {
  try {
    const users = await user.find({});
    res.status(201).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
  // user
  //   .find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((e) => {
  //     res.status(400);
  //     res.send(e);
  //   });
});
/////////reading tasks///////////
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }

  // Task.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((e) => {
  //     res.status(400);
  //     res.send(e);
  //   });
});
///GETTING BY ID
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user_res = await user.findById(_id);
    if (!user_res) return res.status(200).send("no user for the given id ");
    res.status(201).send(user_res);
  } catch (e) {
    res.status(400).send(e);
  }
  // user
  //   .findById(_id)
  //   .then((taskname) => {
  //     if (!taskname)
  //       return res.status(404).send("task not found for the given id");
  //     res.send(taskname);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });
});

app.listen(port, () => {
  console.log("App listening on the port", port);
});
