import { Router } from "express";
import {
  createBudget,
  getUserBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "../../controllers/budget.controller";

const budgetRouter = Router();

budgetRouter.post("/:userId", createBudget);
budgetRouter.get("/:userId", getUserBudgets);
budgetRouter.get("/id/:id", getBudgetById);
budgetRouter.put("/:id", updateBudget);
budgetRouter.delete("/:id", deleteBudget);

export default budgetRouter;
