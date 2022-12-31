import { Posts } from "src/model/Posts";
class PostController {
  async newPost(req, res) {
    const data = {
      userId: req.user.id,
      content: req.body.content,
      
    };
  }
}

export default new PostController();
