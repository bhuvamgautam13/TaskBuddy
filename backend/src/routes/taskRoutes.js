const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  acceptTask,
  completeTask
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);

router.post("/:id/accept", acceptTask);
router.post("/:id/complete", completeTask);

module.exports = router;