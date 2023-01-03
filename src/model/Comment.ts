import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  comment_text: string;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at: Date;

  @ManyToOne((type) => User, (user) => user.comments)
  user: User;

  @ManyToOne((type) => Post, (post) => post.comments)
  post: Post;
}
