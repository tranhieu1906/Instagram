import express from "express";
const { uploadPost } = require("../utils/awsFunctions");
import Posts from "../controllers/post.controller";

export const Post = express.Router();

Post.post("/post/new", uploadPost.single("post"), Posts.newPost);

Post.delete("/post/:id", Posts.deletePost);
