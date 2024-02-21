const { getUsers, getUser, updateUser, deleteUser} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyJwt");

const router = require("express").Router();

router.use(verifyToken);

router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
