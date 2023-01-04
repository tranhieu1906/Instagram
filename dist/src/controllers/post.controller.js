"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = require("./../model/Comment");
const User_1 = require("../model/User");
const Post_1 = require("../model/Post");
const Like_1 = require("../model/Like");
const http_errors_1 = __importDefault(require("http-errors"));
const data_source_1 = require("../config/data-source");
const { deleteFile } = require("../utils/awsFunctions");
const PostRepo = data_source_1.AppDataSource.getRepository(Post_1.Post);
const UserRepo = data_source_1.AppDataSource.getRepository(User_1.User);
const LikeRepo = data_source_1.AppDataSource.getRepository(Like_1.Like);
const CommentRepo = data_source_1.AppDataSource.getRepository(Comment_1.Comment);
class PostController {
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
        }
        catch (error) {
            next(error);
        }
    }
    async deletePost(req, res, next) {
        try {
            const post = await PostRepo.findOne({
                where: { id: req.params.id },
                relations: {
                    user: true,
                },
            });
            if (!post) {
                return next((0, http_errors_1.default)(401, "Post Not Found"));
            }
            if (post.user.id !== req.user.id) {
                return next((0, http_errors_1.default)(401, "User Not Authenticated"));
            }
            await deleteFile(post.image_url);
            await PostRepo.delete({ id: req.params.id });
            res.status(200).json({
                success: true,
                message: "Post Deleted",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateCaption(req, res, next) {
        try {
            const post = await PostRepo.findOne({
                where: { id: req.params.id },
                relations: {
                    user: true,
                },
            });
            if (!post) {
                return next((0, http_errors_1.default)(401, "Post Not Found"));
            }
            if (post.user.id !== req.user.id) {
                return next((0, http_errors_1.default)(401, "User Not Authenticated"));
            }
            post.content = req.body.content;
            await PostRepo.save(post);
            res.status(200).json({
                success: true,
                message: "Post Updated",
            });
        }
        catch (error) {
            next(error);
        }
    }
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
                return next((0, http_errors_1.default)(401, "Post Not Found"));
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
                await LikeRepo.delete({
                    post: req.params.id,
                    user: req.user.id,
                });
                res.status(200).json({
                    success: true,
                    message: "Delete Like",
                });
            }
            else {
                await LikeRepo.save({
                    post: { id: req.params.id },
                    user: { id: req.user.id },
                });
                res.status(200).json({
                    success: true,
                    message: "Create Like ",
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async newComment(req, res, next) {
        try {
            const post = await PostRepo.findOne({
                where: { id: req.params.id },
            });
            if (!post) {
                return next((0, http_errors_1.default)(401, "Post Not Found"));
            }
            const comment = await CommentRepo.save({
                user: req.user.id,
                comment_text: req.body.comment,
                post: req.params.id,
            });
            res.status(201).json({
                success: true,
                comment,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async DeleteComment(req, res, next) {
        try {
            const comment = await CommentRepo.findOne({
                where: { id: req.params.id },
                relations: {
                    user: true,
                },
            });
            if (!comment) {
                return next((0, http_errors_1.default)(401, "Post Not Found"));
            }
            if (comment.user.id !== req.user.id) {
                return next((0, http_errors_1.default)(401, "User Not Authenticated"));
            }
            await CommentRepo.delete({ id: req.params.id });
            res.status(200).json({
                success: true,
                message: "Comment Delete Success",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateComment(req, res, next) {
        try {
            const comment = await CommentRepo.findOne({
                where: { id: req.params.id },
                relations: {
                    user: true,
                },
            });
            if (!comment) {
                return next((0, http_errors_1.default)(401, "comment Not Found"));
            }
            if (comment.user.id !== req.user.id) {
                return next((0, http_errors_1.default)(401, "User Not Authenticated"));
            }
            comment.comment_text = req.body.comment;
            await CommentRepo.save(comment);
            res.status(200).json({
                success: true,
                message: "Comment Updated",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new PostController();
//# sourceMappingURL=post.controller.js.map