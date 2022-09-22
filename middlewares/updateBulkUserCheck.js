const users = require("../model/users.model");

const updateBulkUserCheck = (req, res, next) => {
  const bulkData = req.body;
  try {
    if (!Array.isArray(bulkData)) {
      res.status(409).send("input an array of user-bulkData");
    } else {
      for (let data of bulkData) {
        const userFound = users.find((user) => user.id == data.id);
        if (!userFound) {
          res.status(404).send({ message: "user not found!" });
        }
      }
    }
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = updateBulkUserCheck;
