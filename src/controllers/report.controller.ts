import { Request, Response } from "express";
import asyncHandler from "../middlewares/async.mdw";
import Report from "../models/report.model";
import ErrorResponse from "../utils/error.util";
import { IReportDoc } from "../utils/interface.util";

/**
 * @name createReport
 * @description Creates a new report
 * @route POST /reports/:userId
 * @access Public
 */
export const createReport = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, description, category } = req.body;

  if (!userId || !title || !description || !category) {
    throw new ErrorResponse("Missing required fields", 400, []);
  }

  const newReport: IReportDoc = await Report.create({
    userId,
    title,
    description,
    category,
  });

  res.status(201).json({
    error: false,
    message: "Report created successfully",
    data: newReport,
  });
});

/**
 * @name getUserReports
 * @description Get all reports for a user
 * @route GET /reports/:userId
 * @access Public
 */
export const getUserReports = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const reports = await Report.find({ userId }).sort({ createdAt: -1 });

  res.status(200).json({
    error: false,
    message: "Fetched user reports successfully",
    data: reports,
  });
});

/**
 * @name getReportById
 * @description Get a single report by its ID
 * @route GET /reports/id/:id
 * @access Public
 */
export const getReportById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const report = await Report.findById(id);

  if (!report) {
    throw new ErrorResponse("Report not found", 404, []);
  }

  res.status(200).json({
    error: false,
    message: "Fetched report successfully",
    data: report,
  });
});

/**
 * @name updateReport
 * @description Update a report by its ID
 * @route PUT /reports/:id
 * @access Public
 */
export const updateReport = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedReport = await Report.findByIdAndUpdate(id, updates, { new: true });

  if (!updatedReport) {
    throw new ErrorResponse("Report not found", 404, []);
  }

  res.status(200).json({
    error: false,
    message: "Report updated successfully",
    data: updatedReport,
  });
});

/**
 * @name deleteReport
 * @description Delete a report by its ID
 * @route DELETE /reports/:id
 * @access Public
 */
export const deleteReport = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedReport = await Report.findByIdAndDelete(id);

  if (!deletedReport) {
    throw new ErrorResponse("Report not found", 404, []);
  }

  res.status(200).json({
    error: false,
    message: "Report deleted successfully",
  });
});
