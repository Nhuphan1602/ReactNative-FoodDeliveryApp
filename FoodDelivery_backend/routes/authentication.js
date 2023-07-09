var express = require('express');
var router = express.Router();
const {
  userRegister, 
  userLogin, 
  checkUserExist,
  tokenRefresh,
  sendOTP,
  verifyOTP,
} = require("../services/authentication.service")

router.post('/register', async(req, res, next) => {
  let body = req.body;
  let response = await userRegister(body);
  res.json(response);
});

router.post('/send-otp', async (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;
  console.log(phoneNumber)
  const response = await sendOTP(phoneNumber);
  res.json(response);
});

router.post('/verify-otp', async (req, res, next) => {
  const { phoneNumber, code } = req.body.requestBody;
  const response = await verifyOTP({ phoneNumber, code });
  res.json(response);
});

router.post('/login', async(req, res, next) => {
    let body = req.body;
    let response = await userLogin(body);
    res.json(response);
});

router.get('/user-exist', async(req, res, next) => {
  let params = req.query;
  let response = await checkUserExist(params);
  res.json(response);
});

router.post("/refresh-token", tokenRefresh);

module.exports = router;