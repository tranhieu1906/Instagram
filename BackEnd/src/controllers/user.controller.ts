import { Follow } from "./../model/Follow";
import { User } from "../model/User";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import Token from "../middlewares/jwt.middleware";
const UserRepo = AppDataSource.getRepository(User);
const FollowRepo = AppDataSource.getRepository(Follow);
class UserController {
  // đăng ký tài khoản
  async signUpUser(req, res, next) {
    try {
      const { name, email, username, password } = req.body;
      const user = await UserRepo.findOne({
        where: [{ email }, { username }],
      });
      if (user) {
        if (user.username === username) {
          return next(createError(401, "User doesn't exist"));
        }
        return next(createError(401, "Email already exists"));
      }
      let hashPassword = await bcrypt.hash(password, 10);
      const newUser = await UserRepo.save({
        name: name,
        email: email,
        username: username,
        password: hashPassword,
      });
      res.status(200).json({
        message: "created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  // đăng nhập
  async loginUser(req, res, next) {
    try {
      const { account, password } = req.body;
      const user = await UserRepo.findOne({
        where: [{ email: account }, { username: account }],
      });
      if (!user) {
        return next(createError(401, "User doesn't exist"));
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return next(createError(401, "Password mismatch"));
      }
      const accessToken = await Token.signAccessToken({ id: user.id });
      res.cookie("token", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      res.status(200).json({
        message: "login successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  //logOut
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
    } catch (error) {
      next(error);
    }
  }
  // Update Password
  async UpdatePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await UserRepo.findOne({
        where: { id: req.user.id },
      });
      const isPasswordMatched = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isPasswordMatched) {
        return next(createError(401, "Invalid Old Password"));
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await UserRepo.save(user);
      res.status(200).json({
        success: true,
        message: "Change password successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  // Follow | Unfollow User
  async followUser(req, res, next) {
    try {
      const userToFollow = await UserRepo.findOne({
        where: { id: req.params.id },
      });
      if (!userToFollow) {
        return next(createError(401, "User Not Found"));
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
      } else {
        FollowRepo.save({
          user: { id: req.user.id },
          follower: { id: req.params.id },
        });
        res.status(200).json({
          success: true,
          message: "create Follow ",
        });
      }
    } catch (error) {
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
    } catch (error) {
      next(error);
    }
  }

  async updateProfile (req,res,next) {
    try {
      const {newUsername, newName, newEmail} = req.body;
      const user = await UserRepo.findOneBy(req.user.id);
      user.username = newUsername;
      user.name = newName;
      user.email = newEmail;
      await UserRepo.save(user)
      res.status(200).json({
        success: true,
        message: "Update profile successfully",
      });
    }catch (error) {
      next(error);
    }
  }

}

export default new UserController();
