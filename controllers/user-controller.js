const User = require("../models/user-models");
const UserDto = require("../dtos/user-dto.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    const usersDto = users.map((user) => new UserDto(user));

    return res.status(200).json({
      success: true,
      message: "Users list found",
      data: usersDto,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching users",
      error: error.message,
    });
  }
};

const getUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId: parseInt(userId) }); // Assuming userId is a number
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDto = new UserDto(user);

    return res.status(200).json({ message: "User found", data: userDto });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, surname, email } = req.body;
    if (!name || !surname || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, surname, email) are required",
      });
    }
    const newUser = await User.create({ name, surname, email });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating user",
      error: error.message,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params; // Using MongoDB's _id
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating user",
      error: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params; // Using MongoDB's _id
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting user",
      error: error.message,
    });
  }
};

// --- EXPORTING ALL FUNCTIONS ---
module.exports = {
  getAllUsers,
  getUserByUserId,
  createUser,
  updateUserById,
  deleteUserById,
};
