import { User } from "../../model/User"
import { AppDataSource } from "../../config/data-source";
const UserRepository = AppDataSource.getRepository(User)
module.exports = (io, socket) => {

    const setupConnect = (userData) => {
        socket.join(userData.id);
        console.log(socket.id + " connected");
        socket.user = userData
         UserRepository.createQueryBuilder()
            .update(User)
            .set({ online: true , last_activity: null})
            .where("id = :id", { id: userData.id })
            .execute().then(() => {
                socket.broadcast.emit("get-active-status", (socket.user.id))
            })
            .catch(error => {
                throw new Error(error.message)});
    }

    const setupDisconnect = () => {
        console.log(socket.id + "disconnect")
        if (socket.user) {
             UserRepository.createQueryBuilder()
                .update(User)
                .set({ online: false , last_activity: new Date() })
                .where("id = :id", { id: socket.user.id })
                .execute().then(() => {
                    socket.broadcast.emit("get-active-status", (socket.user.id))
                })
                .catch(error => {
                    throw new Error(error.message)});
        }
    }
    socket.on("setup", setupConnect);
    socket.on("disconnect", setupDisconnect);
}