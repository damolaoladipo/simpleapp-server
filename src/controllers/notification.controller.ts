// controllers/notification.controller.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middlewares/async.mdw';
import NotificationModel from '../models/notification.model';
import ErrorResponse from '../utils/error.util';

/**
 * Create a new notification
 */
export const createNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, message, type } = req.body;

    if (!userId || !message || !type) {
      return next(new ErrorResponse('Missing required fields', 400, []));
    }

    const newNotification = await NotificationModel.create({
      userId,
      message,
      type,
    });

    return res.status(201).json({
      error: false,
      errors: [],
      data: newNotification,
      message: 'Notification created successfully',
      status: 200,
    });
  }
);

/**
 * Get all notifications for a specific user
 */
export const getNotificationsForUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!userId) {
      return next(new ErrorResponse('User ID is required', 400, []));
    }

    const notifications = await NotificationModel.find({ userId });

    if (!notifications.length) {
      return next(new ErrorResponse('No notifications found', 404, []));
    }

    return res.status(200).json({
      error: false,
      errors: [],
      status: 200,
      message: 'Notifications fetched successfully',
      data: notifications,
    });
  }
);

/**
 * Mark a notification as read
 */
export const markNotificationAsRead = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const notification = await NotificationModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return next(new ErrorResponse('Notification not found', 404, []));
    }

    return res.status(200).json({
      error: false,
      errors: [],
      status: 200,
      message: 'Notification marked as read',
      data: notification,
    });
  }
);

/**
 * Delete a notification
 */
export const deleteNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedNotification = await NotificationModel.findByIdAndDelete(id);

    if (!deletedNotification) {
      return next(new ErrorResponse('Notification not found', 404, []));
    }

    return res.status(204).json({
      error: false,
      errors: [],
      status: 200,
      message: 'Notification deleted successfully',
    });
  }
);
