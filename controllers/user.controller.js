const fs = require("fs");
const users = require("../model/users.model");

//!----------- GET All Users with Query parameter -----------
module.exports.getAllUser = (req, res) => {
  const userLimit = req.query?.limit;
  try {
    if (userLimit) {
      res.status(200).json({
        success: true,
        data: users.slice(0, userLimit),
      });
    } else {
      res.status(200).json({
        success: true,
        data: users,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
