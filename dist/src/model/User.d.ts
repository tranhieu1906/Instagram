import { Post } from "./Post";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Follow } from "./Follow";
export declare class User {
    id: number;
    username: string;
    name: string;
    password: string;
    email: string;
    profile_picture: string;
    created_at: Date;
    posts: Post[];
    comments: Comment[];
    likes: Like[];
    following: Follow[];
    followers: Follow[];
}
