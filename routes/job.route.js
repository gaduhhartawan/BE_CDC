const {
  getJob,
  getJobs,
  createJob,
  deleteJob,
  updateJob,
  saveData,
} = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyJwt");

const router = require("express").Router();

router.use(verifyToken);

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", createJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
