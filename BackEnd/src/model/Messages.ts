import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {User} from "./User";
import {Rooms} from "./Room";

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Rooms, (Rooms) => Rooms.messages)
    room: Rooms;

    @ManyToOne(() => User, (Users) => Users.name)
    author: User[]
    @Column({type: "varchar"})
    content: string;

    @Column({
        type: "timestamp"
    })
    time: string
}