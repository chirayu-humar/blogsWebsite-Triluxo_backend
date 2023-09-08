const bcrypt = require("bcrypt");
var bodyParser = require('body-parser');
const Blog = require("../models/blog");
const { hash } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const publishNewBlog = async (req, res) => {
    // console.log(req.body);
    console.log("payload is : ");
    console.log(req.payload)
    console.log("*************************")
    const {id, title, image_url, content, topic} = req.body;
    console.log(req.payload["avatar_url"]);
    console.log("*************************")
    const blog = new Blog({
        id,
        title,
        image_url,
        avatar_url: req.payload["avatar_url"],
        content,
        topic,
        userName: req.payload["username"],
        author: req.payload["Name"],
        comments: [],
    });
    const newBlog = await blog.save();
    res.json({
        "message": "we saved the blog",
    });
}

const bringAllblogs = async (req, res) => {
    const blogsList = await Blog.find({}, 'id title image_url avatar_url author topic');     
    res.json(blogsList);
}

const bringSpecificBlog = async (req, res) => {
    let {id} = req.params;
    console.log(id);
    id = Number(id);
    const blogTobeSent = await Blog.findOne({ id: id}).exec();
    // console.log(blogTobeSent);
    res.json(blogTobeSent);
}

const commentOnBlog = async (req, res) => {
    let {id} = req.params;
    const {comment} = req.body;
    console.log(id);
    const blog = await Blog.findOne({ id: id}).exec();
    let {comments} = blog;
    console.log(comments);
    comments.push({
        comment: comment,
        commentedBy: req.payload["Name"], 
    });
    const update = { comments: comments };
    await blog.updateOne(update);

    res.json({
        message: "comment added",
    })
}

module.exports = {publishNewBlog, bringAllblogs, bringSpecificBlog, commentOnBlog};