import { User } from "./User";
import { Post } from "./Post";
export declare class Like {
    id: number;
    created_at: Date;
    user: User;
    post: Post;
}
