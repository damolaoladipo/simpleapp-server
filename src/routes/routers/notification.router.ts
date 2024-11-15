// routes/notification.routes.ts
import { Router } from 'express';
import { createNotification, getNotificationsForUser, markNotificationAsRead, deleteNotification } from '../../controllers/notification.controller';

const notificationRouter = Router();


notificationRouter.post('/', createNotification);
notificationRouter.get('/:userId', getNotificationsForUser);
notificationRouter.put('/:id/read', markNotificationAsRead);
notificationRouter.delete('/:id', deleteNotification);

export default notificationRouter;
