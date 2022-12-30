import { Users } from "./../model/Users";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
const User = AppDataSource.getRepository(Users);
class UserController {
  // đăng ký tài khoản
  async signUpUser(req: any, res: any, next) {
    try {
      const { name, email, username, password } = req.body;
      const user = await User.findOne({
        where: [{ email }, { username }],
      });
      if (user) {
        if (user.username === username) {
          return next(createError(401, "User doesn't exist"));
        }
        return next(createError(401, "Email already exists"));
      }
      let hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.save({
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
      const user = await User.findOne({
        where: [{ email: account }, { username: account }],
      });
      if (!user) {
        return next(createError(401, "User doesn't exist"));
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return next(createError(401, "Password mismatch"));
      }
      res.status(200).json({
        message: "login successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  // Update Password
  async UpdatePassword(req,res){
    const { oldPassword, newPassword } = req.body;
    
  }
}

export default new UserController();
