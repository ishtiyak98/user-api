const users = require("../model/users.model");

const updateUserCheck = (req, res, next) => {
  try {
    const data = req.body;
    const matchedUser = users.find((user) => user.id == data.id);
    const props = Object.keys(data);

    if (!data.id) {
      res.status(404).send({
        message: "id not found!",
      });
    } else if (!matchedUser) {
      res.status(404).send({
        message: "user not found!",
      });
    } else if (matchedUser) {
      for (let prop of props) {
        const matchProp = [
          "id",
          "name",
          "gender",
          "address",
          "contact",
          "photoUrl",
        ].includes(prop);
        if (!matchProp) {
          res.status(409).send({ message: "property name is invalid" });
        }
      }
      next();
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = updateUserCheck;
