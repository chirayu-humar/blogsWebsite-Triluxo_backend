const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    registrationDate: { 
        type: Date,
        default: Date.now,
        required: true
    },
    avatar_url: {
        type: String,
        default: "",
    }
});

const User = model("User", userSchema);
module.exports =  User;