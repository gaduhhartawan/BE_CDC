require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConn");

// Route - Import
const testRoute = require("./routes/test.route");

connectDB();
const app = express();

// Route
app.use("/api", testRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
