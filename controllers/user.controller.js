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

//!----------- GET a random User -----------
module.exports.getRandomUser = (req, res) => {
  const randomIndex = Math.floor(Math.random() * users.length);
  try {
    res.status(200).json({
      success: true,
      data: users[randomIndex],
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//!----------- Save a New User -----------
module.exports.addUser = (req, res) => {
  const newUser = req.body;
  try {
    if (newUser) {
      users.push(newUser);
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          res.send("Adding new user Failed!");
        } else {
          res.status(200).send({
            status: "successful",
            newUserId: newUser?.id,
            newUserName: newUser?.name,
          });
        }
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//!----------- Delete a User By ID -----------
module.exports.userDelete = (req, res) => {
  try {
    const { id } = req.body;

    const deleteIndex = users.findIndex((data) => data.id == Number(id));

    users.splice(deleteIndex, 1);
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        res.send("Failed to delete a user from JSON!");
      } else {
        res.status(200).send({
          status: "successful",
          deleteId: `deleted ${id}`,
        });
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//!----------- update a User By ID -----------
module.exports.userUpdate = (req, res) => {
  try {
    const updateInfo = req.body;
    let userIndex = users.findIndex((obj) => obj.id == updateInfo.id);
    const props = Object.keys(updateInfo);
    for (let prop of props) {
      users[userIndex][prop] = updateInfo[prop];
    }
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        res.send("failed to save the data in JSON");
      } else {
        res.status(200).send({
          status: "successful",
          modifiedId: updateInfo.id,
        });
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//!----------- Update Bulk User By ID -----------
module.exports.userBulkUpdate = (req, res) => {
  try {
    const updateUsersInfo = req.body;

    for (let updateUser of updateUsersInfo) {
      let userIndex = users.findIndex((obj) => obj.id == updateUser.id);
      const props = Object.keys(updateUser);
      for (let prop of props) {
        users[userIndex][prop] = updateUser[prop];
      }
    }
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        res.send("failed to update in JSON");
      } else {
        res.status(200).send({
          status: "successful",
          updatedUser: `${updateUsersInfo?.length}`,
        });
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
