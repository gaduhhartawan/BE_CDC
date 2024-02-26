require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./config/dbConn");

// Route - Import
const userRoute = require("./routes/user.route");
const jobRoute = require("./routes/job.route");
const authRoute = require("./routes/auth.route");

connectDB();
const app = express();

// Cookie Parser
app.use(cookieParser());

// Express Json
app.use(express.json());

// Cors
app.use(
  cors({
    origin: ["http://localhost:8800", "http://localhost:5173", "https://fe-cdc.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Route
app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
