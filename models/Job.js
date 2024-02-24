const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobType: {
      type: [String],
      required: false,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    salaryNum: {
      type: Number,
      required: false,
    },
    jobCategory: {
      type: String,
      required: true,
    },
    jobDesc: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    workingSite: {
      type: String,
      required: false,
    },
    jobLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
