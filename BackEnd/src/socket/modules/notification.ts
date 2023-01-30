import { User } from "../../model/User";
import { AppDataSource } from "../../config/data-source";

const UserRepo = AppDataSource.getRepository(User);

let onlineUsers 

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

module.exports = (io, socket) => {
  const sendNotification = ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver?.socketId).emit(
      "getNotification",
      `${senderName} ${type} your post.`
    );
  };
  const sendText = ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  };
  (async function () {
    onlineUsers = await UserRepo.find({
      where: {
        online: true,
      },
    });
  })();

  socket.on("sendNotification", sendNotification);
  socket.on("sendText", sendText);
};
