"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const express_1 = __importDefault(require("express"));
const { uploadPost } = require("../utils/awsFunctions");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const jwt_middleware_1 = __importDefault(require("../middlewares/jwt.middleware"));
const app = (0, express_1.default)();
app.use(jwt_middleware_1.default.veryfyAccessToken);
exports.Post = express_1.default.Router();
exports.Post.post("/post/new", uploadPost.single("post"), post_controller_1.default.newPost);
exports.Post.get("/post/:id", post_controller_1.default.likeUnlikePost)
    .delete("/post/:id", post_controller_1.default.deletePost)
    .put("/post/:id", post_controller_1.default.updateCaption);
exports.Post.post("/post/comment/:id", post_controller_1.default.newComment)
    .delete("/post/comment/:id", post_controller_1.default.DeleteComment)
    .put("/post/comment/:id", post_controller_1.default.updateComment);
//# sourceMappingURL=postRouter.js.map