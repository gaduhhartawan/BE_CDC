const {
  getJob,
  getJobs,
  createJob,
  deleteJob,
  updateJob,
  getJobsUsers,
  saveData,
} = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyJwt");

const router = require("express").Router();

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", verifyToken, createJob);
router.patch("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);
router.get("/myjobs/:id", verifyToken, getJobsUsers);

module.exports = router;
