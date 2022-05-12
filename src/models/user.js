const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) throw new Error("Age cannot be negative value");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 6) throw new Error("password length should be >6 ");
      else if (value.includes("password"))
        throw new Error("password phrase not allowd ");
    },
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is incorrect");
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("Just before saving");
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 2);
    //console.log(user.password);
  }
});
const user = mongoose.model("users", userSchema);

module.exports = user;
