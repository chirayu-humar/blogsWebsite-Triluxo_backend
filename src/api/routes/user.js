const express = require("express");
const router = express.Router();
const {createNewUser, loginTheUser} = require("../controllers/user");

router.post("/register", createNewUser);

router.post("/login", loginTheUser);

module.exports = router;