import UserModel from '../models/user.model'; 
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import asyncHandler from '../middlewares/async.mdw'; 
import ErrorResponse from '../utils/error.util'; 

/**
 * @name createUser
 * @description Creates a new user
 * @route POST /users
 * @access Public
 */
export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        role,
    });

    await newUser.save();
    res.status(201).json(newUser);
});

/**
 * @name getAllUsers
 * @description Get all users
 * @route GET /users
 * @access Public
 */
export const getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const users = await UserModel.find({});
    res.status(200).json(users);
});

/**
 * @name getUserById
 * @description Get a user by ID
 * @route GET /users/:id
 * @access Public
 */
export const getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
        throw new ErrorResponse("User not found", 404, []);  // Using ErrorResponse
    }
    res.status(200).json(user);
});

/**
 * @name updateUser
 * @description Update user details
 * @route PUT /users/:id
 * @access Public
 */
export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const updateData: any = { username, email, role };
    if (password) {
        updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
        throw new ErrorResponse("User not found", 404, []);  // Using ErrorResponse
    }
    res.status(200).json(updatedUser);
});

/**
 * @name deleteUser
 * @description Delete a user by ID
 * @route DELETE /users/:id
 * @access Public
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new ErrorResponse("User not found", 404, []);  // Using ErrorResponse
    }
    res.status(204).json({ message: 'User deleted successfully' });
});
