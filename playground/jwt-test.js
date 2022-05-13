const jwt = require("jsonwebtoken");

const token = jwt.sign({ _id: "red123" }, "testing");
console.log(token);
const verify = jwt.verify(token, "testing");
console.log(verify);
