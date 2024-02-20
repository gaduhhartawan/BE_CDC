const Job = require("../models/Job");

const getJobs = async (req, res) => {
  try {
    const jobs = Job.find();
    if (!jobs) return res.status(404).json({ message: "No Jobs Data" });
    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getJob = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { getJobs, getJob };
