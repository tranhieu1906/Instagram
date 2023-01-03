import { Follow } from "../model/Follow";
import { User } from "../model/User";
import { Post } from "../model/Post";
import { Like } from "../model/Like";
import createError from "http-errors";
import { AppDataSource } from "../config/data-source";
const { deleteFile } = require("../utils/awsFunctions");
const PostRepo = AppDataSource.getRepository(Post);
const UserRepo = AppDataSource.getRepository(User);
const LikeRepo = AppDataSource.getRepository(Like);

class PostController {
  // add posts
  async newPost(req, res, next) {
    try {
      const postData = {
        content: req.body.content,
        image_url: req.file.location,
        user: req.user.id,
      };
      const post = await PostRepo.save(postData);
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
      const post = await PostRepo.findOne({
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
      await deleteFile(post.image_url);
      await PostRepo.delete({ id: req.params.id });
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
      const post = await PostRepo.findOne({
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
      await PostRepo.save(post);
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
      const post = await PostRepo.findOne({
        where: { id: req.params.id },
        relations: {
          user: true,
          likes: true,
        },
      });
      if (!post) {
        return next(createError(401, "Post Not Found"));
      }
      console.log(req.user.id);
      const like = await LikeRepo.findOne({
        relations: {
          user: true,
          post: true,
        },
        where: { post: { id: req.params.id }, user: { id: req.user.id } },
      });
      if (like) {
        LikeRepo.delete({
          post: req.params.id,
          user: req.user.id,
        });
        res.status(200).json({
          success: true,
          message: "Delete Like",
        });
      } else {
        LikeRepo.save({
          post: { id: req.params.id },
          user: { id: req.user.id },
        });
        res.status(200).json({
          success: true,
          message: "Create Like ",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();
