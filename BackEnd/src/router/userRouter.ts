import express from "express";
import UserController from "./../controllers/user.controller";
import Token from "../middlewares/jwt.middleware";
const { uploadAvatar } = require("../utils/awsFunctions");
export const User = express.Router();
const app = express();

User.post("/signup", UserController.signUpUser);
User.post("/login", UserController.loginUser);
User.get("/logout", UserController.logOut);

User.put(
  "/update/password",
  Token.veryfyAccessToken,
  UserController.UpdatePassword
);
User.put(
  "/update/profile",
  Token.veryfyAccessToken,
  UserController.updateProfile
);
User.put(
  "/update/avatar",
  uploadAvatar.single("avatar"),
  Token.veryfyAccessToken,
  UserController.updateAvatar
);

User.post("/password/forgot",UserController.forgotPassword);
User.put("/password/reset/:token", UserController.resetPassword);

User.get("/follow/:id", Token.veryfyAccessToken, UserController.followUser);

User.get("/me", Token.veryfyAccessToken, UserController.getAccountDetails);
