import { Request, Response } from "express";
import asyncHandler from "../middlewares/async.mdw";
import Achievement from "../models/achievement.model";
import ErrorResponse from "../utils/error.util";
import { IAchievementDoc } from "../utils/interface.util";

/**
 * @name createAchievement
 * @description Creates a new achievement for a user
 * @route POST /achievements/:userId
 * @access Public
 */
export const createAchievement = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, description, date, category, tags } = req.body;

  if (!userId || !title || !description || !date || !category) {
    throw new ErrorResponse("Missing required fields", 400, []);
  }

  const newAchievement: IAchievementDoc = await Achievement.create({
    userId,
    title,
    description,
    date,
    category,
    tags,
  });

  res.status(201).json({
    error: false,
    message: "Achievement created successfully",
    data: newAchievement,
  });
});

/**
 * @name getUserAchievements
 * @description Get all achievements for a user
 * @route GET /achievements/:userId
 * @access Public
 */
export const getUserAchievements = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const achievements = await Achievement.find({ userId }).sort({ date: -1 });

  res.status(200).json({
    error: false,
    message: "Fetched user achievements successfully",
    data: achievements,
  });
});

/**
 * @name getAchievementById
 * @description Get an achievement by its ID
 * @route GET /achievements/id/:id
 * @access Public
 */
export const getAchievementById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const achievement = await Achievement.findById(id);

  if (!achievement) {
    throw new ErrorResponse("Achievement not found", 404, []);
  }

  res.status(200).json({
    error: false,
    message: "Fetched achievement successfully",
    data: achievement,
  });
});

/**
 * @name updateAchievement
 * @description Update an achievement by its ID
 * @route PUT /achievements/:id
 * @access Public
 */
export const updateAchievement = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedAchievement = await Achievement.findByIdAndUpdate(id, updates, { new: true });

  if (!updatedAchievement) {
    throw new ErrorResponse("Achievement not found", 404, []);
  }

  res.status(200).json({
    error: false,
    message: "Achievement updated successfully",
    data: updatedAchievement,
  });
});

/**
 * @name deleteAchievement
 * @description Delete an achievement by its ID
 * @route DELETE /achievements/:id
 * @access Public
 */
export const deleteAchievement = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedAchievement = await Achievement.findByIdAndDelete(id);

  if (!deletedAchievement) {
    throw new ErrorResponse("Achievement not found", 404, []);
  }

  res.status(200).json({
    error: false,
    message: "Achievement deleted successfully",
  });
});
