import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;
    
  @ManyToOne((type) => User, (user) => user.following)
  following: User;

  @ManyToOne((type) => User, (user) => user.followers)
  follower: User;
}
