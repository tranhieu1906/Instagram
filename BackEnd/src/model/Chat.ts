import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import { Message } from "./message";

@Entity()
export class Chat {
  @ManyToOne((type) => User)
  @JoinColumn()
  users: User[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany((type) => Message, (message) => message.chat)
  latestMessage: Message;

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[];
}
