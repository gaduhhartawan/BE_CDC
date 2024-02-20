const { fn } = require("../controllers/test.controller");

const router = require("express").Router();

router.get("/test", fn);

module.exports = router;
