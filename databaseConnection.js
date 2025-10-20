const mongoose = require("mongoose");

// databaseConnection.js needs to actually call the connection function
function DbConnection() {
  const DB_URL = process.env.MONGO_URI;
  return mongoose.connect(DB_URL).then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);  
  });
}
module.exports = DbConnection;
