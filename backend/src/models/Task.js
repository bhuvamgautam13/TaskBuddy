const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,

  status: {
    type: String,
    enum: ["open", "accepted", "in-progress", "completed"],
    default: "open",
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("Task", taskSchema);