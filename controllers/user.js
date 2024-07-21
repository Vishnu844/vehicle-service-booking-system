const User = require("../models/vehicleUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //Encrypting password

    const newUser = new User({
      userName: req.body.userName,
      password: hashedPassword,
    });
    await newUser.save(); // saving user details to db
    res.status(200).json({
      status: 1,
      message: "Successfully Created and saved User",
      data: null,
    });
  } catch (err) {
    res.status(200).json({
      status: 0,
      message: "Failed to create user",
      data: null,
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const args = {
      userName: req.body.userName,
    };
    const user = await User.findOne(args);

    if (!user) {
      throw new Error("Incorrect Username or Password");
    } else {
      //comparing the password entered
      const inputPassword = req.body.password;

      const isPasswordTrue = await bcrypt.compare(inputPassword, user.password);

      if (!isPasswordTrue) {
        throw new Error("Incorrect Username or Password");
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      const { password, ...others } = user._doc;
      res.status(200).json({
        status: 1,
        message: "Successfully Logged in",
        data: { ...others },
        token,
      });
    }
  } catch (err) {
    res.status(200).json({
      status: 0,
      message: "Something gone wrong",
      data: null,
      error: err.message,
    });
  }
};
