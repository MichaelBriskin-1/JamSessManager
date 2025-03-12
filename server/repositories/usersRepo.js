const User = require('../models/userModel');

// Get All Users
const getAllUsers = (filters) => {
  return User.find(filters);
};

// Get User By ID
const getById = (id) => {
  return User.findById(id);
};

// Create User
const addUser = (obj) => {
  const per = new User(obj);
  return per.save();
};

module.exports = {
  getAllUsers,
  getById,
  addUser,
};
