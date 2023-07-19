var express = require("express");
const { getUserData, updateUserData } = require("../services/user.service");
var router = express.Router();

router.get("/get-user", async (req, res) => {
    let username = req?.username;
    let response = await getUserData(username);
    res.json(response);
});

router.put("/update-user", async (req, res) => {
  const { username } = req;
  const updateData = req.body;
  const response = await updateUserData(username, updateData);
  res.json(response);
});

module.exports = router;
