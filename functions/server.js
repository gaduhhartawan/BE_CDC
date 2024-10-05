"use strict";
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("../config/dbConn");

// Route - Import
const userRoute = require("../routes/user.route");
const jobRoute = require("../routes/job.route");
const authRoute = require("../routes/auth.route");

connectDB();
const app = express();

// Cookie Parser
app.use(cookieParser());

// Express Json
app.use(express.json());

// Cors
app.use(
  cors()
);

// Route
app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/auth", authRoute);

if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}

export default app;
