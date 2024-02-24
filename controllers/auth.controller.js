const User = require("../models/User");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, fullname, password, imgurl } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Email already exists" });
    }
    const user = await User.create({
      ...req.body,
      email,
      fullname,
      password,
      imgurl,
    });
    const token = createSecretToken(user._id, user.isCompany, user.isAdmin);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id, user.isCompany, user.isAdmin);
    const { password: pwd, ...info } = user._doc;
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json(info);
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.sendStatus(204);
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.sendStatus(204);
      } else {
        res.setHeader("Clear-Site-Data", '"cookies"');
        res.clearCookie("token");
        res.status(200).json({ message: "You are logged out!" });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
