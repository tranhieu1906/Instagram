import { Posts } from "./../model/Posts";
import createError from "http-errors";
import { AppDataSource } from "../config/data-source";
const Post = AppDataSource.getRepository(Posts);

class PostController {
  // add posts
  async newPost(req, res, next) {
    try {
      console.log(req);
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
  // delete post
  async deletePost(req, res, next) {
    try {
      const post = await Post.findOne({
        where: { id: req.params.id },
        relations: {
          user: true,
        },
      });
      if (!post) {
        return next(createError(401, "Post Not Found"));
      }
      if (post.user.id !== req.user.id) {
        return next(createError(401, "User Not Authenticated"));
      }
      await Post.delete({ id: req.params.id });
      res.status(200).json({
        success: true,
        message: "Post Deleted",
      });
    } catch (error) {
      next(error);
    }
  }
  // update caption
  async updateCaption(req, res, next) {
    try {
      const post = await Post.findOne({
        where: { id: req.params.id },
        relations: {
          user: true,
        },
      });
      if (!post) {
        return next(createError(401, "Post Not Found"));
      }
      if (post.user.id !== req.user.id) {
        return next(createError(401, "User Not Authenticated"));
      }
      post.content = req.body.content;
      await Post.save(post);
      res.status(200).json({
        success: true,
        message: "Post Updated",
      });
    } catch (error) {
      next(error);
    }
  }
  // Like or Unlike Post
  async likeUnlikePost(req, res, next) {
    try {
      const post = await Post.findOne({
        where: { id: req.params.id },
        relations: {
          user: true,
          likes: true,
        },
      });
      post.likes.push(req.user.id);
      console.log(post);
      if (!post) {
        return next(createError(401, "Post Not Found"));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNn0sImlhdCI6MTY3MjU1NzEwMSwiZXhwIjoxNjcyNjQzNTAxfQ.EbwWObU-nWPPiawOfYRig0nZwiPFgyAlfFtucXZumK4