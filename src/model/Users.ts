import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Posts } from "./Posts";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Follow } from "./follows";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "varchar" })
  fullname: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  profile_picture: string;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at: Date;

  @OneToMany((type) => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany((type) => Like, (likes) => likes.post)
  likes: Like[];
  
  @OneToMany((type) => Follow, (follow) => follow.following)
  following: Follow[];

  @OneToMany((type) => Follow, (follow) => follow.follower)
  followers: Follow[];
}
