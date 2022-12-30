import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;
    
  @ManyToOne((type) => Users, (user) => user.following)
  following: Users;

  @ManyToOne((type) => Users, (user) => user.followers)
  follower: Users;
}
