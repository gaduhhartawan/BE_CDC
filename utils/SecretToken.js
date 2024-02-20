require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, isCompany) => {
  return jwt.sign({ id, isCompany }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
