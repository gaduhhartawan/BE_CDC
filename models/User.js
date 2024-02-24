const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    fullname: {
      type: String,
      required: [true, "Your full name is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    isCompany: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: false,
    },
    imgUrl: {
      type: String,
      required: false,
      default: "None",
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
