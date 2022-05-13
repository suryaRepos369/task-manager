const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

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
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is incorrect");
    },
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
///////////////checking email and pwd for login method

userSchema.statics.findByCredentials = async (mail, password) => {
  const userdata = await user.findOne({ email: mail });
  if (!userdata) throw Error("unable to find Email");

  const isMatch = await bcrypt.compare(password, userdata.password);

  if (!isMatch) {
    throw Error("invalid password");
  }

  return userdata;
};
////////////using JWT feature///////////
// userSchema.methods.generateAuthToken = async () => {
//   const user = this;
//   console.log("inside token generator");
//   console.log(user._id.toString());
//   const token = await jwt.sign({ _id: "surya" }, "this is testing");
//   console.log(token);
// };

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  //console.log(user._id.toString());
  const token = jwt.sign({ _id: user._id.toString() }, "verifyString");
  //console.log(token);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

////////////hashing plain password function
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
