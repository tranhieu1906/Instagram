import JWT from "jsonwebtoken";
import createError from "http-errors";
import { User } from "../model/User";
import { AppDataSource } from "../config/data-source";
const userRepo = AppDataSource.getRepository(User);

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
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      console.log(token);
      if (token == null) {
        res.status(401).json("token not found");
      }
      JWT.verify(
        token,
        process.env.SECRET_KEY as string,
        async (err: any, payload: any) => {
          if (err) return res.sendStatus(403);
          let userLogin = await userRepo.findOne({
            where: { id: payload.data.id },
          });
          if (!userLogin) {
            return res.status(401).json("Unauthozitaion");
          }
          req.user = userLogin;
          next();
        }
      );
    } catch (error) {
      next(error)
    }
  }
}

export default new Token();
