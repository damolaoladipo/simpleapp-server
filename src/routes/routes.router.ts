import { Router } from "express";
import transactionRoutes from "./routers/transaction.router";
import budgetRoutes from "./routers/budget.router";
import achievementRoutes from "./routers/achievement.router";

const v1Routes = Router();

v1Routes.use("/api/auth", budgetRoutes);
v1Routes.use("/api/transactions", transactionRoutes);
v1Routes.use("/api/budget", budgetRoutes);
v1Routes.use("/api/budget", achievementRoutes);

export default v1Routes;