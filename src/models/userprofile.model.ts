import mongoose, { Schema, Document } from 'mongoose';
import { IUserProfileDoc } from "../utils/interface.util";

const userProfileSchema: Schema = new Schema<IUserProfileDoc>(
    {
        userId: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        bio: { type: String, default: '' },
        avatarUrl: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
    },
    { timestamps: true }
);

const UserProfileModel = mongoose.model<IUserProfileDoc>('UserProfile', userProfileSchema);

export default UserProfileModel;
