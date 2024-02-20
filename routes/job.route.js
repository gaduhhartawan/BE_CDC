const { getJob, getJobs } = require("../controllers/job.controller");

const router = require("express").Router();

router.get("/", getJobs);
router.get("/:id", getJob);

module.exports = router;
