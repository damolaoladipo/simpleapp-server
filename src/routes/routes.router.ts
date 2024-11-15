import { Router } from "express";
import transactionRoutes from "./routers/transaction.router";
import budgetRoutes from "./routers/budget.router";
import achievementRoutes from "./routers/achievement.router";
import reportRouter from "./routers/report.router";

const v1Routes = Router();

v1Routes.use("/api/auth", budgetRoutes);
v1Routes.use("/api/transactions", transactionRoutes);
v1Routes.use("/api/budgets", budgetRoutes);
v1Routes.use("/api/achievements", achievementRoutes);
v1Routes.use("/api/reports", reportRouter);

export default v1Routes;