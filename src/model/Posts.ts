import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { Comment } from "./Comment";
import { Like } from "./Like";

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  content: string;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at: Date;

  @Column({ type: "varchar" })
  image_url: string;

  @ManyToOne((type) => Users, (user) => user.posts)
  user: Users;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany((type) => Comment, (likes) => likes.post)
  likes: Like[];
}
