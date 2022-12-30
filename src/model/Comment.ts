import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Posts } from "./Posts";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  comment_text: string;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at: Date;

  @ManyToOne((type) => Users, (user) => user.comments)
  user: Users;

  @ManyToOne((type) => Posts, (post) => post.comments)
  post: Posts;
}
