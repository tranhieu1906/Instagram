import JWT from "jsonwebtoken";
import createError from "http-errors";
import { Users } from "./../model/Users";
import { AppDataSource } from "../config/data-source";
const User = AppDataSource.getRepository(Users);

class Token {
  async signAccessToken(data) {
    return new Promise((resolve, reject) => {
      const payload = {
        data,
      };
      const secret = process.env.SECRET_KEY;
      const options = {
        expiresIn: "24h",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
  async signRefreshToken(userID) {
    return new Promise((resolve, reject) => {
      const payload = {
        userID,
      };
      const secret = process.env.REFERENCE_TOKEN;
      const options = {
        expiresIn: "1y",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
  veryfyAccessToken(req, res, next) {
    const { token } = req.cookies;
    JWT.verify(token, process.env.SECRET_KEY, async (err, payload) => {
      if (err) {
        return next(createError.Unauthorized());
      }
      req.user = await User.findOne({
          where: { id: payload.data.id },
        })
      next();
    });
  }
}

export default new Token();
