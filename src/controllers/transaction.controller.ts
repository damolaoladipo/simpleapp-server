import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/async.mdw";
import Transaction from "../models/transaction.model";
import { ITransactionDoc } from "../utils/interface.util";
import ErrorResponse from "../utils/error.util";


/**
 * @name createTransaction
 * @description Creates a new transaction for user
 * @route POST /transaction/:userId
 * @access  Public
 */
export const createTransaction = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, type, amount, category, date, description, paymentMethod, currency, tags } = req.body;
  
      if (!userId || !type || !amount || !category) {
    return next(new ErrorResponse("Missing required fields", 400, []));
      }
  
      const newTransaction: ITransactionDoc = await Transaction.create({
        userId,
        type,
        amount,
        category,
        date,
        description,
        paymentMethod,
        currency,
        tags,
      });
  
      return res.status(201).json({ 
        error: false,
        errors: [],
        data: newTransaction,
        message: "Transaction created successfully",
        status: 200,
        });
    } catch (error) {
      next(error); 
    }
  }) 


/**
 * @name getUserTransactions
 * @description Get transactions associated with a user
 * @route GET /transaction/userId
 * @access Public
 */
export const getUserTransactions = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return next(new ErrorResponse("User ID is required", 400, []));
      }
  
      const transactions = await Transaction.find({ userId }).sort({ date: -1 });
  
      if (!transactions.length) {
        return next(new ErrorResponse("No transactions found", 404, []));
      }
  
      return res.status(200).json({ 
        error: false,
        errors: [],
        status: 200,
        message: "Transactions fetched successfully", 
        data: transactions
     });
    } catch (error) {
      next(error);
    }
  })


/**
 * @name getTransactionById
 * @description Get a transaction by ID
 * @route GET /transaction/:id
 * @access Public
 */
export const getTransactionById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
  
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        return next(new ErrorResponse("Transaction not found", 404, []));
      }
  
      return res.status(200).json({
        error: false,
        errors: [],
        status: 200,
        message: "Transaction fetched successfully", 
        data: transaction 
    });
    } catch (error) {
      next(error);
    }
  });



  /**
 * @name updateTransaction
 * @description Update a Transaction
 * @route PUT /transaction/:id
 * @access Public
 */
export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedTransaction) {
      return next(new ErrorResponse("Transaction not found", 404, []));
    }

    return res.status(200).json({ 
        error: false,
        errors: [],
        status: 200,
        message: "Transaction updated successfully", 
        data: updatedTransaction 
    });
  } catch (error) {
    next(error);
  }
};


/**
 * @name deleteTransaction
 * @description delete a transaction
 * @route DELETE /transaction/:id/
 * @access Public
 */
export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return next(new ErrorResponse("Transaction not found", 404, []));
    }

    return res.status(200).json({ 
        error: false,
        errors: [],
        status: 200,
        message: "Transaction deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/**
@name getTransactionsByType
@description Get all transactions of a specific type (either "income" or "expense") for a specific user.
@route GET /transactions/type?type=income
@access Public
@param {string} userId - The ID of the user to fetch transactions for.
@param {string} type - The type of transactions to fetch (income/expense).
@returns {Object} - A list of transactions matching the specified type. 
*/
export const getTransactionsByType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;

    if (!type) {
      return next(new ErrorResponse("Transaction type is required", 400, []));
    }

    const transactions = await Transaction.find({ userId, type }).sort({ date: -1 });

    if (!transactions.length) {
      return next(new ErrorResponse(`No ${type} transactions found`, 404, []));
    }

    return res.status(200).json({ 
        error: false,
        errors: [],
        status: 200,
        message: `Fetched ${type} transactions`, 
        data: transactions });
  } catch (error) {
    next(error);
  }
};


/**
@name getTransactionsByCategory
@description Get all transactions by category for a specific user
@route GET /transactions/
/category?category=food
@access Public
@param {string} userId - The ID of the user whose transactions are being fetched.
@param {string} category - The category to filter transactions by (e.g. food, rent, utilities).
@returns {Object} - An array of matching transactions grouped under a specific category. 
*/
export const getTransactionsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { category } = req.query;

    if (!category) {
      return next(new ErrorResponse("Category is required", 400, []));
    }

    const transactions = await Transaction.find({ userId, category }).sort({ date: -1 });

    if (!transactions.length) {
      return next(new ErrorResponse(`No transactions found for category: ${category}`, 404, []));
    }

    return res.status(200).json({ 
        error: false,
        errors: [],
        status: 200,
        message: `Fetched transactions in category: ${category}`, 
        data: transactions 
    });
  } catch (error) {
    next(error);
  }
};
