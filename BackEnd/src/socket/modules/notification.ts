let onlineUsers = [];
const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
};

module.exports = (io, socket) => {
    const sendNotification = ({senderName, receiverName, type}) => {
        const receiver = getUser(receiverName);
        console.log(receiver);
        io.to(receiver.socketId).emit("getNotification", {
            senderName,
            type,
        });
    }
    const sendText = ({senderName, receiverName, text}) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getText", {
            senderName,
            text,
        });
    }

    socket.on("sendNotification", sendNotification);
    socket.on("sendText", sendText);
}