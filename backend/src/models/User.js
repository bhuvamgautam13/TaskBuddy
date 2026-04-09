const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    enum: ["client", "worker"],
    default: "client",
  },

  wallet: {
    type: Number,
    default: 0,
  },

  location: {
    lat: Number,
    lng: Number,
  },

  rating: {
    type: Number,
    default: 5,
  }
});

module.exports = mongoose.model("User", userSchema);