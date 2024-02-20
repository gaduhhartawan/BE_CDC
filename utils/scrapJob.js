const unirest = require("unirest");
const cheerio = require("cheerio");
const Job = require("../models/Job");

const getJobsData = async () => {
  const category = "mobile programmer";
  const url = `https://www.google.com/search?q=loker+mobile+programmer+bandung&ibp=htl;jobs`;
  const res = await unirest.get(url).header({
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  });

  const $ = cheerio.load(res.body);

  let jobs_results = [];
  $(".pE8vnd").each((i, el) => {
    jobs_results.push({
      jobTitle: $(el).find(".KLsYvd").text(),
      companyName: $(el).find(".nJlQNd").text(),
      jobLocation: $(el).find(".sMzDkb").text(),
      jobLink: $(el).find(".pMhGee").attr("href"),
      jobCategory: category,
      jobDesc: $(el).find(".HBvzbc").text(),
    });
  });

  // Iterate over each job and save it
  // for (const jobData of jobs_results) {
  // console.log(jobs_results);
  // console.log(jobData);
  // const scrapJobData = new Job(jobData);
  // await scrapJobData.save();
  // }

  // console.log(jobs_results);
  return jobs_results;
};

module.exports = getJobsData;
