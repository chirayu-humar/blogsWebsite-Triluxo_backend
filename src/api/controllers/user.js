const bcrypt = require("bcrypt");
var bodyParser = require('body-parser');
const User = require("../models/user");
const { hash } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const createNewUser = async (req, res) => {
    const { username, name, password, emailId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const selectedUser = await User.findOne({userName: `${username}`}, 'Name');
    if (password.length < 5) {
      res.status(400);
      const responseObject = {"status_code":400,"error_msg":"password is too short"};
      res.send(responseObject);
    } else if (selectedUser === null) {
      const user = new User({
        Name: `${name}`,
        userName: `${username}`,
        emailId: `${emailId}`,
        password: `${hashedPassword}`
      });
      const newUser = await user.save();
      res.status(200); 
      const responseObject = {"status_code":200,"msg":"user created successfully"};
      res.send(responseObject);
    } else {
      res.status(400);
      const responseObject = {"status_code":400,"error_msg":"user already exists"};
      res.send(responseObject);
    }
}

const loginTheUser = async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body)
  const dbUser = await User.findOne({userName: `${username}`}, 'Name password userName avatar_url');
  if (dbUser === null) {
    res.status(400);
    const responseObject = {"status_code":400,"error_msg":"invalid username"};
    res.json(responseObject);
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    // console.log("The dbUser is : " + dbUser);
    if (isPasswordMatched) {
      const payload = {
        username: username,
        Name: dbUser.Name,
        avatar_url: dbUser.avatar_url,
      };
      const jwtToken = jwt.sign(payload, "secret_key");
      // console.log(`jwtToken is ${jwtToken}`)
      res.send({ jwtToken });
    } else {
      res.status(400);
      const responseObject = {
        status_code: 400,
        error_msg: "username and password didn't match"
      }
      res.json(responseObject);
    }
  }
}

module.exports = {createNewUser, loginTheUser};