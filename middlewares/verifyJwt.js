const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.TOKEN_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is invalid" });
    req.userId = payload.id;
    req.isCompany = payload.isCompany;
    next();
  });
};

module.exports = verifyToken;
