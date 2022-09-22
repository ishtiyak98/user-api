const express = require("express");
const userController = require("../controllers/user.controller");
const addUserCheck = require("../middlewares/addUserCheck");

const router = express.Router();

router.route("/user/all").get(userController.getAllUser);
router.route("/user/random").get(userController.getRandomUser);
router.route("/user/save").post(addUserCheck,userController.addUser);

module.exports = router;
