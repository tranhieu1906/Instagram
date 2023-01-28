let onlineUsers = [];
const getUser = (username) => {
  return onlineUsers.find((user) => user.username.username === username);
};
export const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username.username === username) &&
    onlineUsers.push({ username, socketId });
};

module.exports = (io, socket) => {
  const sendNotification = ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver?.socketId).emit("getNotification", {
      senderName,
      type,
    });
  };
  const sendText = ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  };

  socket.on("sendNotification", sendNotification);
  socket.on("sendText", sendText);
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });
};
