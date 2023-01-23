module.exports = (io, socket) => {

    const setup = (userData) => {
        socket.join(userData._id);
        console.log(userData.id)
    }

    const joinRoom = (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    }

    const sendMessage = (dataMessage) => {
        let roomId = dataMessage.room.id;
        console.log(roomId)
    }
    socket.on("setup", setup);
    socket.on("join-room", joinRoom);
    socket.on("send-message", sendMessage)
}