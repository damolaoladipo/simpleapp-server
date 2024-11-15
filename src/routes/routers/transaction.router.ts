
import express from "express";
import {
  createTransaction,
  getUserTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionsByType,
  getTransactionsByCategory,
} from "../../controllers/transaction.controller";

const transactionRouter = express.Router();

transactionRouter.post("/", createTransaction);
transactionRouter.get("/:userId", getUserTransactions);
transactionRouter.get("/:id", getTransactionById);
transactionRouter.put("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);
transactionRouter.get("/:userId/type", getTransactionsByType);
transactionRouter.get("/:userId/category", getTransactionsByCategory);

export default transactionRouter;
