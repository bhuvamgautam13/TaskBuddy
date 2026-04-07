const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.log("Mongo Error ❌", err.message);
    process.exit(1);
  }
};  
console.log("ENV:", process.env.MONGO_URI);

module.exports = connectDB;  