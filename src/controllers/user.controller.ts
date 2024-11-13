import UserModel from '../models/user.model'; 
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const { username, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    try {
        const updateData: any = { username, email, role };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const { id } = req.params;

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};
