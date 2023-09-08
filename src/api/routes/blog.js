const express = require("express");
const router = express.Router();
const {publishNewBlog, bringAllblogs, bringSpecificBlog, commentOnBlog} = require("../controllers/blog");
const {authentication} = require("../middlewares/authentication");

router.post("/publish", authentication, publishNewBlog);

router.get("/all-blogs", authentication, bringAllblogs);

router.get("/:id", authentication, bringSpecificBlog);

router.post("/comment/:id", authentication, commentOnBlog);

module.exports = router;