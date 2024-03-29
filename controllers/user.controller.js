const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: "No Users Data" });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, fullname, password, isCompany, isAdmin, imgUrl, phone } =
    req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id != req.userId)
      return res
        .status(403)
        .json({ message: "You can update only your own profile!" });

    // user.email = email;
    user.fullname = fullname;
    user.isCompany = isCompany;
    user.isAdmin = isAdmin;
    user.imgUrl = imgUrl;
    user.phone = phone;

    if (password && password !== "") {
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    if (user.userId !== req.userId)
      return res
        .status(403)
        .json({ message: "You can delete only your own profile!" });

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Your profile has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
