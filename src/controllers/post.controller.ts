import { Posts } from "./../model/Posts";
import createError from "http-errors";
import { AppDataSource } from "../config/data-source";
import { createQueryBuilder } from "typeorm";
const Post = AppDataSource.getRepository(Posts);

class PostController {
  async newPost(req, res, next) {
    try {
      const postData = {
        content: req.body.content,
        image_url: req.file.location,
        user: req.user.id,
      };
      const post = await Post.save(postData);
      res.status(201).json({
        success: true,
        post,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();
