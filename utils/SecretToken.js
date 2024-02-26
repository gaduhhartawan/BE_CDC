require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, isCompany, isAdmin) => {
  return jwt.sign({ id, isCompany, isAdmin }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60 * 1000,
  });
};
