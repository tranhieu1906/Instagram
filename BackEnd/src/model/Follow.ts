import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;
  // đang theo dõi
  @ManyToOne((type) => User, (user) => user.following, {
    onDelete: "CASCADE",
  })
  user: User;
  
  // người theo dõi
  @ManyToOne((type) => User, (user) => user.followers, {
    onDelete: "CASCADE",
  })
  follower: User;
}
