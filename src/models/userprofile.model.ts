import mongoose, { Schema, Document } from 'mongoose';
import { IUserProfileDoc } from "../utils/interface.util";

const userProfileSchema: Schema = new Schema<IUserProfileDoc>(
    {
        userId: { type: String, required: true, unique: true },
        displayName: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        bio: { type: String, default: '' },
        avatar: { type: String, default: '' }
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

const UserProfileModel = mongoose.model<IUserProfileDoc>('UserProfile', userProfileSchema);

export default UserProfileModel;
