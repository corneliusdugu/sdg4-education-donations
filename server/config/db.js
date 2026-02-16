const mongoose = require("mongoose");

async function connectDB() {
  const isTest = process.env.NODE_ENV === "test";
  const mongoUri = isTest ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("Missing MongoDB connection string in env (MONGO_URI / MONGO_URI_TEST)");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

module.exports = connectDB;
