const express = require("express");
const {
  registerUser,
  generateAccessToken,
  loginUser,
  logoutUser
} = require("../authControllers/auth");

const router = express.Router();

router.post("/register", registerUser);

router.post("/token", generateAccessToken);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

module.exports = router;
