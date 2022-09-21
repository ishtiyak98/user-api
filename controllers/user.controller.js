const fs = require('fs');
const users = require("../model/users.model");


module.exports.getAllUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
