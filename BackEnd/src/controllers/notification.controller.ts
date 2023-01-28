import { Notification } from "../model/Notification";
import { AppDataSource } from "../config/data-source";
const NotificationRepo = AppDataSource.getRepository(Notification);

class notificationController {
  async getNotification(req, res, next) {
    try {
      const notification = await NotificationRepo.find({
        where: { userGet: req.user.data.id },
      });
      console.log(notification);
      res.status(201).json({
        success: true,
        notification,
      });
    } catch (error) {
      next(error);
    }
  }
  async saveNotification(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
export default new notificationController();
