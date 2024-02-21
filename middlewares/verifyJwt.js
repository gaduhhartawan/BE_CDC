const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.TOKEN_KEY, async (err, payload) => {
    console.log(payload);
    if (err) return res.status(403).json({ message: "Token is invalid" });
    req.userId = payload.id;
    req.isCompany = payload.isCompany;
    req.isAdmin = payload.isAdmin;
    next();
  });
};

module.exports = verifyToken;
