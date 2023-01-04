import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at: Date;

  @ManyToOne((type) => User, (user) => user.likes)
  user: User;

  @ManyToOne((type) => Post, (post) => post.likes)
  post: Post;
}
