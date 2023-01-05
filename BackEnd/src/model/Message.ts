import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Chat } from "./chat";

@Entity()
export class Message {
  @Column()
  content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.messages)
  sender: User;

  @ManyToOne((type) => Chat, (chat) => chat.messages)
  chat: Chat;
}
