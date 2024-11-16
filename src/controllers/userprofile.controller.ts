// controllers/userProfile.controller.ts
import { Request, Response, NextFunction } from 'express';
import UserProfileModel from '../models/userprofile.model';
import asyncHandler from '../middlewares/async.mdw'; 
import ErrorResponse from '../utils/error.util'; 


/**
 * Create or update a user profile
 */
export const createOrUpdateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { firstName, lastName, email, bio, avatarUrl, phone, address } = req.body;

    let userProfile = await UserProfileModel.findOne({ userId });

    if (!userProfile) {
      userProfile = new UserProfileModel({
        userId,
        firstName,
        lastName,
        email,
        bio,
        avatarUrl,
        phone,
        address,
      });

      await userProfile.save();
      return res.status(201).json({
        error: false,
        errors: [],
        data: userProfile,
        message: "User profile created successfully",
        status: 201,
      });
    }

    userProfile.firstName = firstName;
    userProfile.lastName = lastName;
    userProfile.email = email;
    userProfile.bio = bio;
    userProfile.avatarUrl = avatarUrl;
    userProfile.phone = phone;
    userProfile.address = address;

    await userProfile.save();
    return res.status(200).json({
      error: false,
      errors: [],
      data: userProfile,
      message: "User profile updated successfully",
      status: 200,
    });
  }
);


/**
 * Get a user profile by userId
 */
export const getUserProfileById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const userProfile = await UserProfileModel.findOne({ userId });
    if (!userProfile) {
      return next(new ErrorResponse("User profile not found", 404, []));
    }

    return res.status(200).json({
      error: false,
      errors: [],
      status: 200,
      message: "User profile fetched successfully",
      data: userProfile,
    });
  }
);

/**
 * Delete a user profile
 */
export const deleteUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const deletedProfile = await UserProfileModel.findOneAndDelete({ userId });
    if (!deletedProfile) {
      return next(new ErrorResponse("User profile not found", 404, []));
    }

    return res.status(204).json({
      error: false,
      errors: [],
      status: 204,
      message: "User profile deleted successfully",
    });
  }
);
