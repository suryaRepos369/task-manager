// const User = require("../models/user");
// const jwt = require("jsonwebtoken");
// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer", "");
//     tv.tokenVerify(token);
//     const userdata = await User.findOne({
//       _id: decoded._id,
//       "tokens.token": header,
//     });
//     if (!userdata) throw new Error();
//     console.log(userdata);
//     next();
//     console.log();
//   } catch (e) {
//     res.status(403).send("Please authenticate  :" + e);
//   }
// };

// module.exports = auth;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "verifyString");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
