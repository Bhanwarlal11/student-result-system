const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/studentRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const markRoutes = require("./routes/markRoutes");
const overviewRoutes = require("./routes/overviewRoutes");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const { connectDB } = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

connectDB();

app.use(express.json());

// Routes
app.get("/api", (req, res) => {
  res.send("welcome to result api's...");
});
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/overview", overviewRoutes);


// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
