import { Router } from "express";
import transactionRoutes from "./routers/transaction.router";
import budgetRoutes from "./routers/budget.router";

const v1Routes = Router();

v1Routes.use("/api/transactions", transactionRoutes);
v1Routes.use("/api/budget", budgetRoutes);

export default v1Routes;