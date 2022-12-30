import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Posts } from "./Posts";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at: Date;

  @ManyToOne((type) => Users, (user) => user.likes)
  user: Users;

  @ManyToOne((type) => Posts, (post) => post.likes)
  post: Posts;
}
