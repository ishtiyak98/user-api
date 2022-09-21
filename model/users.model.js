const fs = require("fs");
const path = require("path");

const allUsers = fs.readFileSync(
  path.join(__dirname + "/../users.json"),
  "utf8"
);

const users = JSON.parse(allUsers);

module.exports = users;
