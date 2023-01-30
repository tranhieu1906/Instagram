import { Notification } from "../model/Notification";
import { AppDataSource } from "../config/data-source";
const NotificationRepo = AppDataSource.getRepository(Notification);

class notificationController {
  async getNotification(req, res, next) {
    try {
      const notification = await NotificationRepo.find({
        where: {
          userGet: {
            id: req.user.data.id,
          },
        },
      });
      res.status(201).json({
        success: true,
        notification,
      });
    } catch (error) {
      next(error);
    }
  }
  async sendNotification(req, res, next) {
    const notificationData = {
      userSend: req.user.data.id,
      userGet: req.body.userGet,
      message: req.body.message,
    };
    const notification = await NotificationRepo.save(notificationData);
    res.status(201).json({
      success: true,
      notification,
    });
    try {
    } catch (error) {
      next(error);
    }
  }
}
export default new notificationController();
