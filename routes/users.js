const express = require("express");
const router = express.Router();

// Importing all the controller functions for users
const {
  getAllUsers,
  getUserByUserId,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user-controller"); 



// GET /users/ -> Get a list of all users
router.get("/", getAllUsers);

// GET /users/:userId -> Get a single user by their custom userId
router.get("/:userId", getUserByUserId);

// POST /users/ -> Add a new user
router.post("/", createUser);

// PUT /users/:id -> Update a user by their MongoDB _id
router.put("/:id", updateUserById);

// DELETE /users/:id -> Delete a user by their MongoDB _id
router.delete("/:id", deleteUserById);

// Export the router
module.exports = router;
