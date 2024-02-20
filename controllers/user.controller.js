const User = require("../models/User");

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

module.exports = { getUser };
