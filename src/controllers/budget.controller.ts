import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/async.mdw";
import Budget from "../models/budget.model";
import { IBudgetDoc } from "../utils/interface.util";
import ErrorResponse from "../utils/error.util";

/**
 * @name createBudget
 * @description Creates a new budget for a user
 * @route POST /budget/:userId
 * @access Public
 */
export const createBudget = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, amount, category, startDate, endDate, description, tags } = req.body;

  if (!userId || !title || !amount || !category || !startDate || !endDate) {
    throw new ErrorResponse("Missing required fields", 400, []);
  }

  const newBudget: IBudgetDoc = await Budget.create({
    userId,
    title,
    amount,
    category,
    startDate,
    endDate,
    description,
    tags,
  });

  res.status(201).json({
    error: false,
    message: "Budget created successfully",
    data: newBudget,
  });
});

/**
 * @name getUserBudgets
 * @description Get all budgets for a user
 * @route GET /budget/:userId
 * @access Public
 */
export const getUserBudgets = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const budgets = await Budget.find({ userId }).sort({ createdAt: -1 });

  res.status(200).json({
    error: false,
    message: "Fetched user budgets successfully",
    data: budgets,
  });
});

/**
 * @name getBudgetById
 * @description Get a budget by its ID
 * @route GET /budget/id/:id
 * @access Public
 */
export const getBudgetById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const budget = await Budget.findById(id);

  if (!budget) {
    throw new ErrorResponse("Budget not found", 404, []);
  }

  res.status(200).json({
    error: false,
    message: "Fetched budget successfully",
    data: budget,
  });
});

/**
 * @name updateBudget
 * @description Update a budget by its ID
 * @route PUT /budget/:id
 * @access Public
 */
export const updateBudget = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedBudget = await Budget.findByIdAndUpdate(id, updates, { new: true });

  if (!updatedBudget) {
    throw new ErrorResponse("Budget not found", 404, []);
  }

  res.status(200).json({
    error: false,
    message: "Budget updated successfully",
    data: updatedBudget,
  });
});

/**
 * @name deleteBudget
 * @description Delete a budget by its ID
 * @route DELETE /budget/:id
 * @access Public
 */
export const deleteBudget = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedBudget = await Budget.findByIdAndDelete(id);

  if (!deletedBudget) {
    throw new ErrorResponse("Budget not found", 404, []);
  }

  res.status(200).json({
    error: false,
    message: "Budget deleted successfully",
  });
});
