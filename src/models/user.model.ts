import mongoose, { model, Schema, Types } from "mongoose";
import {IUserDoc } from "../utils/interface.util";

const userSchema = new Schema<IUserDoc>({
  username: {
    type: String,
    required: false,
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
  savedPassword: String,
  passwordType: String,
  userType: String,

  activationToken: String,
  activationTokenExpire: Date,

  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,

});

const User = mongoose.model<IUserDoc>("user", userSchema);

export default User;
