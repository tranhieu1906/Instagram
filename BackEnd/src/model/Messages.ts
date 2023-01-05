import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.target, {
    onDelete: "CASCADE",
  })
  target: User;

  @ManyToOne(() => User, (user) => user.sources, {
    onDelete: "CASCADE",
  })
  source: User;
}
