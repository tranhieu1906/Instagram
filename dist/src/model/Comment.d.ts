import { User } from "./User";
import { Post } from "./Post";
export declare class Comment {
    id: number;
    comment_text: string;
    created_at: Date;
    user: User;
    post: Post;
}
