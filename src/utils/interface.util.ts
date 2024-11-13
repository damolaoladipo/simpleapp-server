import { Document, ObjectId } from "mongoose";


export interface IRoleDoc extends Document {
    name: string;
    description: string;
    slug: string;
    users: Array<ObjectId | any>;
  
    createdAt: string;
    updatedAt: string;
    _id: ObjectId;
    id: ObjectId;
  
    getAll(): Array<IRoleDoc>;
    findByName(name: string): IRoleDoc | null;
  }
  


export interface IUserDoc extends Document  {
    username:  string,
    firstName: string
    lastName: string
    email: string,
    password: string
    savedPassword: string;
    passwordType: string;
    userType: string;
  
    activationToken: String;
    activationTokenExpire: Date;
  
    resetPasswordToken: String;
    resetPasswordTokenExpire: Date;

    isSuper: boolean;
    isUser: boolean;

    matchPassword: (password: string) => boolean;
    getAuthToken: () => string;
    getRefreshToken: () => string;
  
}
