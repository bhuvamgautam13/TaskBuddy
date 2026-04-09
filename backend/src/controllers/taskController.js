const Task = require("../models/Task");
const User = require("../models/User");

// CREATE TASK
exports.createTask = async (req, res) => {
  const { title, description, price, lat, lng } = req.body;

  const task = await Task.create({
    title,
    description,
    price,
    clientId: req.user.id, // later from auth
    location: { lat, lng }
  });

  res.json(task);
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  const tasks = await Task.find().populate("clientId workerId");
  res.json(tasks);
};

// ACCEPT TASK
exports.acceptTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.status !== "open") {
    return res.status(400).json({ message: "Already taken" });
  }

  task.status = "accepted";
  task.workerId = req.user.id;

  await task.save();

  res.json({ message: "Task accepted", task });
};

// COMPLETE TASK + payment processing
exports.completeTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  const worker = await User.findById(task.workerId);

  if (!task) return res.status(404).json({ message: "Task not found" });

  const platformFee = task.price * 0.1;
  const workerPay = task.price - platformFee;

  worker.wallet = (worker.wallet || 0) + workerPay;

  await worker.save();

  task.status = "completed";
  await task.save();

  res.json({
    message: "Task completed & paid",
    workerEarned: workerPay,
    platformFee,
  });
};