import { Router } from "express";
import {
  createReport,
  getUserReports,
  getReportById,
  updateReport,
  deleteReport,
} from "../../controllers/report.controller";

const reportRouter = Router();

reportRouter.post("/:userId", createReport);
reportRouter.get("/:userId", getUserReports);
reportRouter.get("/id/:id", getReportById);
reportRouter.put("/:id", updateReport);
reportRouter.delete("/:id", deleteReport);

export default reportRouter;
