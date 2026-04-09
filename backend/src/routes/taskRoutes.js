const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  acceptTask,
  completeTask

} = require("../controllers/taskController");

const auth = require("../middleware/auth");

// 🔐 Protected routes
router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id/accept", auth, acceptTask);
router.put("/:id/complete", auth, completeTask);

module.exports = router;