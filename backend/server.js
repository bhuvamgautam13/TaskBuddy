const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");

const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// connect DB
connectDB();

// routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// test routes
app.get("/", (req, res) => {
  res.send("Server running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});