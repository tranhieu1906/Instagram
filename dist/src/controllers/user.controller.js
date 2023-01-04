"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Follow_1 = require("./../model/Follow");
const User_1 = require("../model/User");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = require("../config/data-source");
const jwt_middleware_1 = __importDefault(require("../middlewares/jwt.middleware"));
const UserRepo = data_source_1.AppDataSource.getRepository(User_1.User);
const FollowRepo = data_source_1.AppDataSource.getRepository(Follow_1.Follow);
class UserController {
    async signUpUser(req, res, next) {
        try {
            const { name, email, username, password } = req.body;
            const user = await UserRepo.findOne({
                where: [{ email }, { username }],
            });
            if (user) {
                if (user.username === username) {
                    return next((0, http_errors_1.default)(401, "User doesn't exist"));
                }
                return next((0, http_errors_1.default)(401, "Email already exists"));
            }
            let hashPassword = await bcrypt_1.default.hash(password, 10);
            const newUser = await UserRepo.save({
                name: name,
                email: email,
                username: username,
                password: hashPassword,
            });
            res.status(200).json({
                message: "created successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async loginUser(req, res, next) {
        try {
            const { account, password } = req.body;
            const user = await UserRepo.findOne({
                where: [{ email: account }, { username: account }],
            });
            if (!user) {
                return next((0, http_errors_1.default)(401, "User doesn't exist"));
            }
            const isPasswordMatched = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordMatched) {
                return next((0, http_errors_1.default)(401, "Password mismatch"));
            }
            const accessToken = await jwt_middleware_1.default.signAccessToken({ id: user.id });
            res.cookie("token", accessToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });
            res.status(200).json({
                message: "login successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logOut(req, res, next) {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });
            res.status(200).json({
                success: true,
                message: "Logged Out",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async UpdatePassword(req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await UserRepo.findOne({
                where: { id: req.user.id },
            });
            const isPasswordMatched = await bcrypt_1.default.compare(oldPassword, user.password);
            if (!isPasswordMatched) {
                return next((0, http_errors_1.default)(401, "Invalid Old Password"));
            }
            user.password = await bcrypt_1.default.hash(newPassword, 10);
            await UserRepo.save(user);
            res.status(200).json({
                success: true,
                message: "Change password successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async followUser(req, res, next) {
        try {
            const userToFollow = await UserRepo.findOne({
                where: { id: req.params.id },
            });
            if (!userToFollow) {
                return next((0, http_errors_1.default)(401, "User Not Found"));
            }
            const follow = await FollowRepo.findOne({
                relations: {
                    user: true,
                    follower: true,
                },
                where: {
                    user: { id: req.user.id },
                    follower: { id: req.params.id },
                },
            });
            if (follow) {
                FollowRepo.delete({
                    user: { id: req.user.id },
                    follower: { id: req.params.id },
                });
                res.status(200).json({
                    success: true,
                    message: "Delete Follow",
                });
            }
            else {
                FollowRepo.save({
                    user: { id: req.user.id },
                    follower: { id: req.params.id },
                });
                res.status(200).json({
                    success: true,
                    message: "create Follow ",
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async getAccountDetails(req, res, next) {
        try {
            const user = await UserRepo.findOne({
                relations: {
                    posts: true,
                    followers: true,
                },
                where: { posts: { id: req.params.id }, id: req.user.id },
            });
            res.json({ user: user });
        }
        catch (error) {
            next(error);
        }
    }
    async updateProfile(req, res, next) {
        try {
            const { newUsername, newName, newEmail } = req.body;
            const user = await UserRepo.findOneBy(req.user.id);
            user.username = newUsername;
            user.name = newName;
            user.email = newEmail;
            await UserRepo.save(user);
            res.status(200).json({
                success: true,
                message: "Update profile successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateAvatar(req, res, next) {
        try {
            const newAvatar = req.file.location;
            const user = await UserRepo.findOneBy(req.user.id);
            user.profile_picture = newAvatar;
            await UserRepo.save(user);
            res.status(200).json({
                success: true,
                message: "Update Avatar successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map