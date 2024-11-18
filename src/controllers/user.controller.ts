import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model'; 
import Role from '../models/role.model';
import bcrypt from 'bcrypt';
import asyncHandler from '../middlewares/async.mdw'; 
import ErrorResponse from '../utils/error.util'; 


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
        throw new ErrorResponse("User not found", 404, []); 
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
    const { username, firstName, lastName, email, password, userType} = req.body;

    const updateData: any = { username, firstName, lastName, email, password, userType};
    if (password) {
        updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
        throw new ErrorResponse("User not found", 404, []);   
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
        throw new ErrorResponse("User not found", 404, []); 
    }
    res.status(204).json({ message: 'User deleted successfully' });
});
