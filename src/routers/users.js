const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const app = express();
app.use(express.json());
const auth = require("../middleware/auth");

///////////////////////////////////////////////////////creating user////////////
router.post("/users/signup", async (req, res) => {
  const user1 = new User(req.body);

  // .save()
  // .then((user) => {
  //   res.status(201).send(user);
  // })
  // .catch((e) => {
  //   res.status(400).send(e);
  // });
  try {
    const user = await user1.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
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
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
//update by id

router.patch("/users/:id", async (req, res) => {
  console.log(req.body);
  ///allowing the selected fields for updating
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.send("name email password and age only allowed for update");
  }
  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    //   console.log(user
    // );
    if (!user) return res.status(404).send("requested id has no user");
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
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
});

// router.post("/users/login", async (req, res) => {
//   // console.log(req.body.email);
//   try {
//     const user = await User.findByCredentials(
//       req.body.email,
//       req.body.password
//     );

//     const token = await user.generateAuthToken();
//     res.send({ user, token });

//     //  console.log("in User model checking", user);
//   } catch (e) {
//     res.status(404).send("Unable to log in " + e);
//   }
// });

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send("Unable to login " + e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send("Logged out ");
  } catch (error) {
    res.status(500).send(error);
  }
});
//////////////////       Log out all tokens
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logged out from all sessions");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
