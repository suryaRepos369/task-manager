const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const app = express();
app.use(express.json());
// //creating task
// router.post("/tasks", async (req, res) => {
//   const task = new Task(req.body);
//   try {
//     const tasks = await task.save();
//     res.status(201).send(tasks);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

/////////reading tasks///////////
// router.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(201).send(tasks);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

///////////////////////////////////////////////////////creating user////////////
router.post("/users", async (req, res) => {
  const user1 = new User(req.body);
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

/////////Reading user//////////

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});
///GETTING BY ID

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user_res = await User.findById(_id);
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

module.exports = router;
