import { User } from "../../model/User"
import { AppDataSource } from "../../config/data-source";
const UserRepository = AppDataSource.getRepository(User)
module.exports = (io, socket) => {

    const setupConnect = async (userData) => {
        socket.user = userData
        console.log(socket.id + " connected")
        console.log(socket.user)
        await UserRepository.createQueryBuilder()
            .update(User)
            .set({ online: true })
            .where("id = :id", { id: userData.id })
            .execute().catch(error => {
                throw new Error(error.message)})
    }

    const setupDisconnect = async  () => {
        await UserRepository.createQueryBuilder()
            .update(User)
            .set({ online: false })
            .where("id = :id", { id: socket.user?.id })
            .execute().catch(error => {
                throw new Error(error.message)});
        console.log(socket.id + " disconnected")
    }

    socket.on("setup", setupConnect);
    socket.on("disconnect", setupDisconnect);
}