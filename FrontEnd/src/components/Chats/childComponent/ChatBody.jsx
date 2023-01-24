import {useState, useEffect} from "react";
import "../../../App.css"
import axios from "../../../api/axios";
import {Button, ListItem} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
const ariaLabel = { 'aria-label': 'description' };


export default function ChatBody(props) {
    let {onClose, chatId, socket} = props;
    let [listMessages, setListMessages] = useState([]);
    let [presentRoom, setPresentRoom] = useState();
    let [message, setMessage] = useState("");

    const sendMessage = async () => {
            if (message !== "") {
                setMessage("")
                await axios.post(`/api/v1/message/send`, {
                    content: message,
                    chatId: chatId
                }).then((res) => {
                    let data = res.data.newMessage
                    socket.emit("send-message", data);
                    setListMessages([...listMessages,data])
                })
            }
    };

    useEffect(() => {
        if (chatId !== null) {
            axios.get(`/api/v1/chat/${chatId}`).then((res) => {
                setPresentRoom(res.data.dataChat);
                let listMessage = res.data.dataMessage;
                setListMessages( listMessage )
                socket.emit('join-room', chatId)
            })
        }
    },[chatId])

    useEffect(() => {
        console.log(1)
        socket?.on("take-message",(dataMessage) => {
            console.log(dataMessage)
            if (dataMessage.room.id === chatId) {
                setListMessages([...listMessages,dataMessage])
            }
        })
    });

    const addChat = () => {
        onClose()
    }

    return (
        <>
            {presentRoom === undefined ? (
                <div className="flex flex-col items-center">
                    <svg aria-label="Direct" className="_ab6- ml-3.5" color="#262626" fill="#262626" height="96"
                         role="img"
                         viewBox="0 0 96 96" width="96">
                        <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round"
                                strokeLinejoin="round" strokeWidth="2"></circle>
                        <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="69.286"
                              x2="41.447" y1="33.21" y2="48.804"></line>
                        <polygon fill="none"
                                 points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
                                 stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                    </svg>
                    <b>Tin nhắn của bạn</b>
                    <p>Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm.</p>
                    <Button variant="contained" onClick={addChat}>gửi tin nhắn</Button>
                </div>
            ) : (
                <>
                    <div className="chat-header">
                        <div>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt="avatar"/>
                                </ListItemAvatar>
                                <ListItemText primary={presentRoom.roomName} secondary="Jan 9, 2014"/>
                            </ListItem>
                        </div>
                    </div>

                    <div className="view-message">
                        {listMessages.map((message,index) => (
                            <div key={index}>
                                <h1>{message.content}</h1>
                                <h1>nguoi gui: {message.author.name}</h1>
                            </div>

                        ))}
                    </div>

                    <div className="message-send">
                        <input
                            type="text"
                            value={message}
                            placeholder="message"
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>send</button>
                    </div>
                </>
            )}
        </>
    )
}