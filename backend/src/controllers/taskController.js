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

  task.status = "accepted";
  task.workerId = req.user.id;

  await task.save();

  res.json(task);
};

// COMPLETE TASK + PAYMENT
exports.completeTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.status = "completed";
  await task.save();

  const worker = await User.findById(task.workerId);

  const platformFee = task.price * 0.1;
  const workerPay = task.price - platformFee;

  worker.wallet += workerPay;
  await worker.save();

  res.json({
    message: "Task completed",
    workerPay,
    platformFee
  });
};