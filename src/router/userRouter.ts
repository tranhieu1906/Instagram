import express from "express";
import UserController from "./../controllers/user.controller"
export const User = express.Router();

User.post("/signup", UserController.signUpUser);
User.post("/login",UserController.loginUser)