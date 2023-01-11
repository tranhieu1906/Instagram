import { Follow } from "../model/Follow";
import { User } from "../model/User";
import createError from "http-errors";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { AppDataSource } from "../config/data-source";
import Token from "../middlewares/jwt.middleware";
import { sendEmail } from "../utils/sendEmail";
import { Like, MoreThan } from "typeorm";

const UserRepo = AppDataSource.getRepository(User);
const FollowRepo = AppDataSource.getRepository(Follow);
class UserController {
  // signUp
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
  // login
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
      const accessToken = await Token.signAccessToken(user);
      res.status(200).json({
        message: "login successfully",
        accessToken,
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
          following: true,
          follower: true,
        },
        where: {
          following: { id: req.user.id },
          follower: { id: req.params.id },
        },
      });
      if (follow) {
        FollowRepo.delete({
          following: { id: req.user.id },
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
  // AccountDetails
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
  // updateProfile
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
    } catch (error) {
      next(error);
    }
  }
  // updateAvatar
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
    } catch (error) {
      next(error);
    }
  }
  // Forgot Password
  async forgotPassword(req, res, next) {
    try {
      const user = await UserRepo.findOneBy({ email: req.body.email });
      if (!user) {
        return next(createError(404, "User Not Found"));
      }
      const resetToken = crypto.randomBytes(20).toString("hex");
      let resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000);
      UserRepo.save(user);
      const resetPasswordUrl = `https://${req.get(
        "host"
      )}/password/reset/${resetPasswordToken}`;
      try {
        await sendEmail({
          email: user.email,
          templateId: process.env.SENDGRID_RESET_TEMPLATEID,
          data: {
            reset_url: resetPasswordUrl,
          },
        });
        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email}`,
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
  // Reset Password
  async resetPassword(req, res, next) {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await UserRepo.findOneBy({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpiry: MoreThan(new Date(Date.now())),
    });
    if (!user) {
      createError(404, "User Not Found");
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await UserRepo.save(user);
    const accessToken = await Token.signAccessToken({ id: user.id });
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
  }
  // User Search
  async searchUsers(req, res, next) {
    try {
      if (req.query.keyword) {
        const users = await UserRepo.find({
          where: [
            { name: Like(`%${req.query.keyword}%`) },
            { username: Like(`%${req.query.keyword}%`) },
          ],
        });
        res.status(200).json({
          success: true,
          users,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  // suggested Users
  async suggestedUsers(req, res, next) {
    try {
      const users = await UserRepo.find({
        relations: {
          followers: true,
        },
      });
      const suggestedUsers = users
        .filter(
          (u) =>
            !u.followers.includes(req.user.id) &&
            u.id.toString() !== req.user.id.toString()
        )
        .slice(-5);

      res.status(200).json({
        success: true,
        users: suggestedUsers,
      });
    } catch (error) {
      next(error);
    }
  }
  // Get User Details
  async getUserDetails(req, res, next) {
    try {
      const user = await UserRepo.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
