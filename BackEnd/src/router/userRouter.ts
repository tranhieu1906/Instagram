import express from "express";
import UserController from "./../controllers/user.controller"
import Token from "../middlewares/jwt.middleware"
export const User = express.Router();
const app = express();


User.post("/signup", UserController.signUpUser);
User.post("/login",UserController.loginUser);
User.get("/logout",UserController.logOut);

User.put("/update/password",Token.veryfyAccessToken, UserController.UpdatePassword);
User.put("/update/profile",Token.veryfyAccessToken, UserController.updateProfile)

User.get("/follow/:id",Token.veryfyAccessToken, UserController.followUser);

User.get("/me", Token.veryfyAccessToken, UserController.getAccountDetails);

