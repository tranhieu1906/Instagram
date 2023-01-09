import {
    Entity,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
} from "typeorm";
import {User} from "./User";
import {Messages} from "./Messages";
@Entity()
export class Rooms {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "enum",
      enum: ["group","private"],
    default : "private"})
    status: string;

    @Column({type: "varchar"})
    roomName: string;

    @ManyToMany(() => User)

    @JoinTable({
        name: "users-join-room"
    })
    participation: User[];

    @OneToMany(() => Messages, (Messages) => Messages.room)
    messages: Messages;

    @OneToMany(() => User, (User) => User)
    user: User[];
}