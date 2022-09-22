const users = require("../model/users.model");

const deleteUserCheck = (req, res, next) => {
  try {
    const { id } = req.body;
    const deleteIndex = users.findIndex((data) => data.id == Number(id));
    if (!id) {
      res.status(404).send({
        message: "id not found",
      });
    } else if (!deleteIndex || deleteIndex == -1) {
      res.status(404).send({
        message: "user not found in JSON",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = deleteUserCheck;
