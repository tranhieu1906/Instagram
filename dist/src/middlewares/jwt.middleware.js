"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const User_1 = require("../model/User");
const data_source_1 = require("../config/data-source");
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
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
            jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(err);
                }
                else {
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
            jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    veryfyAccessToken(req, res, next) {
        const { token } = req.cookies;
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, async (err, payload) => {
            if (err) {
                return next(http_errors_1.default.Unauthorized());
            }
            req.user = await userRepo.findOne({
                where: { id: payload.data.id },
            });
            next();
        });
    }
}
exports.default = new Token();
//# sourceMappingURL=jwt.middleware.js.map