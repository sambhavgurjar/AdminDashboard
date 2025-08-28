const mongoose = require("mongoose");

let mongoUrl = "mongodb://127.0.0.1:27017/myDB";

async function dbConfig() {
  try {
    await mongoose.connect(process.env.MONGO_URL || mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");
  } catch (err) {
    
    console.error("Failed to connect Database:", err.message);
  }
}

module.exports = dbConfig;
