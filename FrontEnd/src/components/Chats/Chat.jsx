import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setListMessage((list) => [...list, messageData]);
      setMessage("");
    }
  };

  const updateMessage = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setListMessage((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div>
        <p>Room chat</p>
      </div>
      <div>
        <ScrollToBottom>
          {listMessage.map((messageContent, index) => {
            return (
              <div
                id={username === messageContent.author ? "you" : "other"}
                key={index}
              >
                <div>
                  <div>
                    <p>{messageContent.message}</p>
                  </div>
                  <div>
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="flex items-center gap-3 justify-between border rounded-full py-2.5 px-4 m-5 relative">
        <input
          type="text"
          value={message}
          placeholder="message"
          onChange={updateMessage}
          
        />
        <button
          onClick={sendMessage}
          className="text-primary-blue font-medium text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;