const Task = require("../models/task");
const express = require("express");
const router = new express.Router();
const app = express();
app.use(express.json());

router.post("/tasks", async (req, res) => {
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
/////////reading tasks///////////
router.get("/tasks", async (req, res) => {
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

router.patch("/tasks/:id", async (req, res) => {
  //   const updates = Object.keys(req.body);
  //   console.log(updates);
  //   console.log(req.body);
  //   const allowedUpdates = ["status"];
  //   const isValidUpdate = updates.every((data) => {
  //     allowedUpdates.includes(data);
  //   });
  //   console.log(isValidUpdate);
  //   if (!isValidUpdate) {
  //     return res.status(404).send("only  status allowed to modify");
  //   }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    // if (!task) return res.status(404).send("no user found");
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
