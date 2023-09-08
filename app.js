const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = require("./src/api/routes/user");
const blogRouter = require("./src/api/routes/blog");
// const productRouter = require("./src/api/routes/products");

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

async function connectMongoDB() {
  await mongoose.connect("mongodb+srv://chirayuhumar:i$yfmq_7UZ5-Jig@cluster0thefirst.nhyz19x.mongodb.net/Triluxo_Database?retryWrites=true&w=majority");
}

const initializer = async function () {
    try {
      connectMongoDB();
      app.listen( process.env.PORT || 8000, () => {
        console.log("server statred at port 8000");
      });
    } catch (e) {
      console.log(e.message);
      process.exit(1);
    }
  };
  
  initializer();

  const User = require("./src/api/models/user");
//   const Non_prime_products = require("./src/api/models/nonPrimeProducts");



app.use("/user", userRouter);
app.use("/blog", blogRouter);
// app.use("/products", productRouter);