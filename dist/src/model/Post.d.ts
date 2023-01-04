import { User } from "./User";
import { Comment } from "./Comment";
import { Like } from "./Like";
export declare class Post {
    id: number;
    content: string;
    created_at: Date;
    image_url: string;
    user: User;
    comments: Comment[];
    likes: Like[];
}
