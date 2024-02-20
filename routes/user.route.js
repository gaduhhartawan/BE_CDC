const { getUser, updateUser, deleteUser} = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
