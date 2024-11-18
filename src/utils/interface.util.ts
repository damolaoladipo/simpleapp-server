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
    displayName: string
    email: string,
    password: string
    badges: string
    achievement: string
    roles: Array<ObjectId | any>;
    slug: string,
    userType: string;
    
    
    activationToken: String;
    activationTokenExpire: Date;
  
    resetPasswordToken: String;
    resetPasswordTokenExpire: Date;

    isSuper: boolean;
    isUser: boolean;

    
    createdAt: Date;
    updatedAt: Date;

    getAll(): Array<IUserDoc>;
    findById(id: any):  IUserDoc | null;
    matchPassword(password: string): Promise<boolean>,
    getAuthToken(): Promise<string>
  
}

export interface ITransactionDoc extends Document {
  userId: ObjectId
  type: 'income' | 'expense'
  description: string
  amount: number
  category: string
  paymentMethod: 'cash' | 'credit card' | 'bank transfer' | 'mobile payment'
  status: 'completed' | 'pending' | 'failed'
  currency: string
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface IAchievementDoc extends Document {
  userId: ObjectId;
  title: string;
  description: string;
  date: Date;
  category: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IReportDoc extends Document {
  userId: ObjectId;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotificationDoc extends Document {
  userId: ObjectId;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProfileDoc extends Document {
  userId: ObjectId;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IRegister {
    username:  string,
    displayName: string
    email: string,
    password: string
    userType: string;
}

export interface IResult {
  error: boolean;
  message: string;
  code: number;
  data: any;
}
