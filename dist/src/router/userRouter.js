"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./../controllers/user.controller"));
const jwt_middleware_1 = __importDefault(require("../middlewares/jwt.middleware"));
const { uploadAvatar } = require("../utils/awsFunctions");
exports.User = express_1.default.Router();
const app = (0, express_1.default)();
exports.User.post("/signup", user_controller_1.default.signUpUser);
exports.User.post("/login", user_controller_1.default.loginUser);
exports.User.get("/logout", user_controller_1.default.logOut);
exports.User.put("/update/password", jwt_middleware_1.default.veryfyAccessToken, user_controller_1.default.UpdatePassword);
exports.User.put("/update/profile", jwt_middleware_1.default.veryfyAccessToken, user_controller_1.default.updateProfile);
exports.User.put("/update/avatar", uploadAvatar.single("avatar"), jwt_middleware_1.default.veryfyAccessToken, user_controller_1.default.updateAvatar);
exports.User.get("/follow/:id", jwt_middleware_1.default.veryfyAccessToken, user_controller_1.default.followUser);
exports.User.get("/me", jwt_middleware_1.default.veryfyAccessToken, user_controller_1.default.getAccountDetails);
//# sourceMappingURL=userRouter.js.map