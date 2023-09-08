const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const blogSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: false,
        default: "",
    },
    avatar_url: {
        type: String,
        required: false,
        default: "",
    },
    publishing_date: { 
        type: Date,
        default: Date.now,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    comments: [{
        type: Object,
    }],
});

const Blog = model("Blog", blogSchema);
module.exports =  Blog;