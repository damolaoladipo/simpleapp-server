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
    avatar: string,
    username:  string,
    firstName: string
    lastName: string
    email: string,
    password: string
    savedPassword: string;
    passwordType: string;
    userType: string;

    createdAt: string
    badges: string
    achievement: string

    slug: string,
    roles: Array<ObjectId | any>;
  
    activationToken: String;
    activationTokenExpire: Date;
  
    resetPasswordToken: String;
    resetPasswordTokenExpire: Date;

    isSuper: boolean;
    isUser: boolean;


    getAll(): Array<IUserDoc>;
    findById(id: any):  IUserDoc | null;
    matchPassword(password: string): Promise<boolean>,
    getAuthToken(): Promise<string>
  
}

export interface ITransactionDoc extends Document {
  userId: ObjectId
  type: 'income' | 'expense'
  amount: number
  category: string
  date: Date
  time: string
  paymentMethod: 'cash' | 'credit card' | 'bank transfer' | 'mobile payment'
  status: 'completed' | 'pending' | 'failed'
  currency: string
  reference: string;
  description?: string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBudgetDoc extends Document {
  userId: ObjectId;
  title: string;
  amount: number;
  category: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAchievementDoc extends Document {
  userId: ObjectId;
  title: string;
  description: string;
  date: Date;
  category: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReportDoc extends Document {
  userId: ObjectId;
  title: string;
  description: string;
  status: "pending" | "resolved" | "rejected";
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotificationDoc extends Document {
  userId: ObjectId;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}