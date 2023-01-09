// import "./App.css";
import { useState } from "react";
import Chat from "./Chat";


function ViewChat({socket}) {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    const updateUserName = (event) => {
        setUsername(event.target.value);
    }

    const updateRoom = (event) => {
        setRoom(event.target.value);
    }

    return (
        <div className="">
            {!showChat ? (
                <div className="">
                    <h3> participation Chat</h3>
                    <input
                        type="text"
                        placeholder="name"
                        onChange={updateUserName}
                    />
                    <input
                        type="text"
                        placeholder="name room"
                        onChange={updateRoom}
                    />
                    <button onClick={joinRoom}>Join A Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default ViewChat;