const jwt = require("jsonwebtoken");
const User = require("../routers/users");

const auth = async (req, res, next) => {
  try {
      const header = req.header("authorization").replace("Bearer", "");
      const verify = await jwt.verify(header,)
    console.log();
  } catch (e) {
    res.status(403).send("Please authentoicate  :" + e);
  }
};

module.exports = auth;
