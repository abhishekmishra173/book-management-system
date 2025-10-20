const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const DbConnection = require("./databaseConnection");

const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");

DbConnection();

// http://localhost:3000/users
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
    data: "hey",
  });
});

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

// This will catch any route that hasn't been defined above
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "This route does not exist",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
