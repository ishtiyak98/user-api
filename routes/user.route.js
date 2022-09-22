const express = require("express");
const userController = require("../controllers/user.controller");
const addUserCheck = require("../middlewares/addUserCheck");
const deleteUserCheck = require("../middlewares/deleteUserCheck");

const router = express.Router();

router.route("/user/all").get(userController.getAllUser);
router.route("/user/random").get(userController.getRandomUser);
router.route("/user/save").post(addUserCheck,userController.addUser);
router.route("/user/delete").delete( deleteUserCheck,userController.userDelete);

module.exports = router;
