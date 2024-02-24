const Job = require("../models/Job");
const getJobsData = require("../utils/scrapJob");

const getJobs = async (req, res) => {
  const filters = {
    ...(req.query.category && {
      jobCategory: { $regex: req.query.category, $options: "i" },
    }),
    ...(req.query.jobtype && {
      jobType: { $in: req.query.jobtype },
    }),
    ...(req.query.search && {
      jobTitle: { $regex: req.query.search, $options: "i" },
    }),
    ...(req.query.location && {
      jobLocation: { $regex: req.query.location, $options: "i" },
    }),
    ...((req.query.min || req.query.max) && {
      salaryNum: {
        ...(req.query.min && { $gt: req.query.min }),
        ...(req.query.max && { $lt: req.query.max }),
      },
    }),
  };

  try {
    const jobs = await Job.find(filters);
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

const createJob = async (req, res) => {
  if (!req.isCompany && !req.isAdmin) {
    return res
      .status(403)
      .json({ message: "Only a company and Admin can create a job post!" });
  }

  const newJobPost = new Job({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedJob = await newJobPost.save();
    res.status(201).json({ message: "Post a new job successfully", savedJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateJob = async (req, res) => {
  const id = req.params.id;
  const {
    companyName,
    jobType,
    jobTitle,
    salaryNum,
    jobCategory,
    jobDesc,
    jobLocation,
    jobLink,
  } = req.body;
  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.userId !== req.userId)
      return next(createError(403, "You can update only your job post!"));

    job.companyName = companyName;
    job.jobType = jobType;
    job.jobTitle = jobTitle;
    job.salaryNum = salaryNum;
    job.jobCategory = jobCategory;
    job.jobDesc = jobDesc;
    job.jobLocation = jobLocation;
    job.jobLink = jobLink;

    await job.save();

    res
      .status(200)
      .json({ message: "Job updated successfully", updatedJob: job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const deleteJob = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.findById(id);

    if (job.userId !== req.userId)
      return res
        .status(403)
        .json({ message: "You can delete only your job post!" });

    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Your job post has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Temporary for save scrap data
const saveData = async (req, res) => {
  try {
    const data = await getJobsData();
    for (const jobData of data) {
      const scrapJobData = new Job(jobData);
      await scrapJobData.save();
    }

    res
      .status(201)
      .json({ message: `Berhasil tambah Data sejumlah ${data.length}` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob, saveData };
