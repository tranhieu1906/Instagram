import { User } from "../model/User";
import { Rooms} from "../model/Room";
import { Messages } from "../model/Messages";
import { AppDataSource } from "../config/data-source";
const UserRepository = AppDataSource.getRepository(User);
const RoomRepository = AppDataSource.getRepository(Rooms);
const MessageRepository = AppDataSource.getRepository(Messages)
class Chat {

    async getDataChat(req, res) {
        try {
            console.log(req.params.id)
            let user = req.user.data
            let chatId = req.params.id;
            let dataChat = await RoomRepository.find({
                relations: {
                    users: true,
                },
                where: {id : chatId}
            });

            let dataMessage = await MessageRepository.find({
                relations: {
                    author: true
                },
                where: {
                    room: dataChat
                }
            })

            res.status(200).json({
                success: true,
                dataChat: dataChat[0],
                dataMessage: dataMessage,
            })
        }catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }

    async findCreateChat(req, res) {
        try {
            let user = req.user.data;
            let userChat = await UserRepository.findOneBy({id: req.body.userIdChat[0]});
            let ChatName = user.id + ":" + userChat.id;
            let chatData = await RoomRepository.find({
                relations:{
                    users: true
                },
                where: {
                    roomName: ChatName,
                }
            })

            if (chatData.length < 1) {
                ChatName = userChat.id + ":" + user.id;
                chatData = await RoomRepository.find({
                    relations:{
                        users: true
                    },
                    where: {
                        roomName: ChatName,
                    }
                })
            }

            if (chatData.length < 1) {
                let newChat = new Rooms();
                newChat.roomName = ChatName;
                newChat.users = [user,userChat]
                let ChatData = await RoomRepository.save(newChat);
                res.status(200).json({
                    success : true,
                    chatData : ChatData
                })
            } else {
                res.status(200).json({
                    success : true,
                    dataChat : chatData[0]
                })
            }
        }catch (error) {
            res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }

    async getListChat(req,res) {
        try {
            let user = req.user.data
            let listChat = await RoomRepository.find({
                where: {
                    users: user.id
                },
                relations: {
                    users: true,
                }
            });
            res.status(200).json({
                success : true,
                listChat: listChat
            });
        } catch (error) {
            res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }

    async createChatGroup(req,res) {
        try {
            let user = req.user.data
            let listUserId = req.body.listUserId;
            let listUser = []
            listUser.push(user)
            for (let i = 0; i < listUserId.length; i++) {
                let userChat = await UserRepository.findOneBy({id: listUserId[i]});
                listUser.push(userChat)
            }
            let newGroupChat = new Rooms();
            newGroupChat.roomName = "";
            newGroupChat.status = "group";
            newGroupChat.users = listUser;
            newGroupChat.Admin = user;
            let dataGroupChat = await RoomRepository.save(newGroupChat);
            if (dataGroupChat) {
                res.status(200).json({
                    success: true,
                    dataGroup: dataGroupChat
                })
            }
        }catch (error) {

        }
    }

    async removeFromGroup(req,res) {
        let userIdRemove = req.body.userIdRemove;
        let GroupChatId = req.body.groupChatId;

    }

    async addToGroup(res, req) {

    }

}

export default new Chat();