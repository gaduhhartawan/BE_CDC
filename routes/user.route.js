const { getUser } = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/:id", getUser);

module.exports = router;
