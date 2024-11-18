import mongoose, { Schema, Document } from 'mongoose';
import { INotificationDoc } from "../utils/interface.util";

const notificationSchema: Schema = new Schema<INotificationDoc>(
    {
        userId: { type: String, required: true },
        message: { type: String, required: true },
        type: { type: String, enum: ['info', 'warning', 'error'], default: 'info' },
        isRead: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: "_version",
        toJSON: {
          transform(doc: any, ret) {
            ret.id = ret._id;
          },
        },
      }
);

const NotificationModel = mongoose.model<INotificationDoc>('Notification', notificationSchema);

export default NotificationModel;
